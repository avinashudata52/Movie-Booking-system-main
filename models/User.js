import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user'
    },

    // for admin and user
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    //for admin only
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      }
    ],
    screen: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Screen",
      }
    ]
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
