// models/Movie.js
import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    screens: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Screen",
        },
    ]
});

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;