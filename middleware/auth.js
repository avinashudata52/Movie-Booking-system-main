import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export default function auth(role = "") {
    return async (req, res, next) => {
        const token = req.cookies.jwt;

        if (!token) {
            return res.json({ success: false, message: 'Access denied. No token provided.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);

            if (!decoded) {
                return res.json({ success: false, message: 'User not found.' });
            }

            if (role === "") {
                next();
                return;
            }
            
            if (role && decoded.role !== role) {
                return res.json({ success: false, message: 'Access denied. You do not have the required role.' });
            }

            next();
        } catch (error) {
            console.error('Error verifying JWT token:', error);
            res.json({ success: false, message: 'Invalid token.' });
        }
    };
};