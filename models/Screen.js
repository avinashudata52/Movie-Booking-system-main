import mongoose from "mongoose";


const ShowtimeSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const SeatSchema = new mongoose.Schema({
    seatIndex: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'booked', 'locked'],
        default: 'available'
    },
    lockedUntil: {
        type: Date
    },
});

const ScreenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    totalSeats: {
        type: Number,
        required: true,
        default: 60
    },
    seats: [SeatSchema],
    showtimes: ShowtimeSchema
});


const Screen = mongoose.model("Screen", ScreenSchema);
export default Screen;