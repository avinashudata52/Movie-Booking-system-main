// models/FoodItem.js

import mongoose from "mongoose";

const FoodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        ref: 'FoodItem',
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const FoodItem = mongoose.model("FoodItem", FoodItemSchema);
export default FoodItem;