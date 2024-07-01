import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import path from 'path'
import userRoutes from "./routes/userRoutes.js";
import seatRoutes from "./routes/seatRoutes.js";
import foodItemRoutes from "./routes/foodItemRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import screenRoutes from "./routes/screenRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";


const __dirname = path.resolve();
dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use("/api/uploads", express.static("public/uploads"));

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/food-items', foodItemRoutes);
app.use('/api/screens', screenRoutes);
app.use('/api/seats', seatRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/notifications', notificationRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to Mongo DB"))
    .catch((err) => {
      console.error("failed to connect with mongo");
      console.error(err);
    });
};

const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
