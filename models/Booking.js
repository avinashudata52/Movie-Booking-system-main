import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    ticketId: {
        type: Number, //create and add unique 5 digit number whenver the booking done succeffully.
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    screenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Screen',
        required: true
    },
    seatNumbers: [{
        type: Number,
        required: true
    }],
    showtime: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
});

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;