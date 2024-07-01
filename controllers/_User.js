import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import { hashPassword, comparePasswords } from '../utility/bcrypt.js';

export async function registerUser(req, res, next) {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "15d"
    });

    const isProduction = process.env.CLIENT_DOMAIN !== 'localhost';

    res.cookie('jwt', token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      secure: isProduction,
      httpOnly: true,
      sameSite: "strict"
    });

    res.json({ success: true, message: 'User registered and logged in successfully', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.json({ success: false, message: 'Internal Server Error' });
  }
}

// Log in an existing user
export async function loginUser(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'Invalid Email or password' });
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res.json({ success: false, message: 'Invalid Email or password' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "15d"
    });

    const isProduction = process.env.CLIENT_DOMAIN !== 'localhost';

    res.cookie('jwt', token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      secure: isProduction,
      httpOnly: true,
      sameSite: "strict"
    });

    res.json({ success: true, message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.json({ success: false, message: 'Internal Server Error' });
  }
}

// Admin login
export async function adminLogin(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'Invalid Email or password' });
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res.json({ success: false, message: 'Invalid Email or password' });
    }

    if (user.role !== "admin") {
      return res.json({ success: false, message: 'You are not a Admin user.' })
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "15d"
    });

    const isProduction = process.env.CLIENT_DOMAIN !== 'localhost';

    res.cookie('jwt', token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      secure: isProduction,
      httpOnly: true,
      sameSite: "strict"
    });

    res.json({ success: true, message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.json({ success: false, message: 'Internal Server Error' });
  }
}

// Log out a user
export async function logoutUser(req, res, next) {
  res.clearCookie('jwt');
  res.json({ success: true, message: 'Logged out successfully.' });
}

// Get user ID from JWT
export function getUserId(req, res) {
  const jwtCookie = req.cookies.jwt;

  if (!jwtCookie) {
    return res.json({ success: false, message: "Login to continue." });
  }

  try {
    const decodedToken = jwt.verify(jwtCookie, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    res.json({ success: true, userId });
  } catch (error) {
    console.error('Error decoding or verifying JWT token:', error);
    res.json({ success: false, message: 'Internal Server Error' });
  }
}


// Get user ID from JWT
export function isAdminUser(req, res) {
  const jwtCookie = req.cookies.jwt;

  if (!jwtCookie) {
    return res.json({ success: false, message: "Login to continue." });
  }

  try {
    const decodedToken = jwt.verify(jwtCookie, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    const role = decodedToken.role;
    if (role === 'admin') {
      res.json({ success: true, userId });
    }
    else {
      res.json({ success: false, message: "Only Admin user allowed to enter." });
    }
  } catch (error) {
    console.error('Error decoding or verifying JWT token:', error);
    res.json({ success: false, message: 'Internal Server Error' });
  }
}

// Get user data from JWT
export async function getUserData(req, res) {
  const jwtCookie = req.cookies.jwt;

  if (!jwtCookie) {
    return res.json({ success: false, message: "User not logged In." });
  }

  try {
    const decodedToken = jwt.verify(jwtCookie, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    const userData = await User.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: 'Invalid JWT token' });
    }
    res.json({ success: true, message: 'User data retrieved successfully.', user: userData });
  } catch (error) {
    console.error('Error decoding or verifying JWT token:', error);
    res.json({ success: false, message: 'User not logged In.' });
  }
}

