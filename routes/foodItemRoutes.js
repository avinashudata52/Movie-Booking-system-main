// routes/foodItemRoutes.js

import express from 'express';
import { getFoodItems, getFoodItemById, createFoodItem, updateFoodItem, deleteFoodItem } from '../controllers/_FoodItem.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getFoodItems);
router.get('/:id', getFoodItemById);
router.post('/', auth('admin'), createFoodItem); // by admin
router.put('/:id', auth('admin'), updateFoodItem); // by admin
router.delete('/:id', auth('admin'), deleteFoodItem); // by admin

export default router;
