import FoodItem from '../models/FoodItem.js';

// @desc    Get all food items
// @route   GET /api/food-items
// @access  Public
export async function getFoodItems(req, res) {
    try {
        const foodItems = await FoodItem.find();
        res.json({ success: true, foodItems });
    } catch (error) {
        console.error('Error fetching food items:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// @desc    Get food item by ID
// @route   GET /api/food-items/:id
// @access  Public
export async function getFoodItemById(req, res) {
    try {
        const foodItem = await FoodItem.findById(req.params.id);
        if (foodItem) {
            res.json({ success: true, foodItem });
        } else {
            res.status(404).json({ success: false, message: 'Food item not found' });
        }
    } catch (error) {
        console.error('Error fetching food item:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// @desc    Create a new food item
// @route   POST /api/food-items
// @access  Admin
export async function createFoodItem(req, res) {
    try {
        const { name, quantity, price } = req.body;
        const foodItem = new FoodItem({ name, quantity, price });
        const createdFoodItem = await foodItem.save();
        res.status(201).json({ success: true, message: "Food item created successfully.", foodItem: createdFoodItem });
    } catch (error) {
        console.error('Error creating food item:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// @desc    Update a food item
// @route   PUT /api/food-items/:id
// @access  Admin
export async function updateFoodItem(req, res) {
    try {
        const { name, quantity, price } = req.body;
        const foodItem = await FoodItem.findById(req.params.id);

        if (foodItem) {
            foodItem.name = name || foodItem.name;
            foodItem.quantity = quantity || foodItem.quantity;
            foodItem.price = price || foodItem.price;

            const updatedFoodItem = await foodItem.save();
            res.json({ success: true, message: 'Food item updated successfully.', foodItem: updatedFoodItem });
        } else {
            res.status(404).json({ success: false, message: 'Food item not found' });
        }
    } catch (error) {
        console.error('Error updating food item:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// @desc    Delete a food item
// @route   DELETE /api/food-items/:id
// @access  Admin
export async function deleteFoodItem(req, res) {
    try {
        const foodItem = await FoodItem.findById(req.params.id);

        if (foodItem) {
            await foodItem.remove();
            res.json({ success: true, message: 'Food item removed successfully.' });
        } else {
            res.status(404).json({ success: false, message: 'Food item not found' });
        }
    } catch (error) {
        console.error('Error deleting food item:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
