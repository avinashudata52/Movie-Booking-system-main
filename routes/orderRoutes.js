// routes/orderRoutes.js

import express from 'express';
import { createOrder, getOrderById, getUserOrders, updateOrderStatus } from '../controllers/_Order.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth(), createOrder);
router.get('/:id', auth(), getOrderById);
router.get('/user/:userId', auth(), getUserOrders);
router.put('/:id/status', auth('admin'), updateOrderStatus);

export default router;
