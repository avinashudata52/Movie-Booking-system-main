// controllers/_Order.js

import Order from '../models/Order.js'

// Create a new order
export const createOrder = async (req, res) => {
    const { userId, items, totalPrice } = req.body;

    try {
        const order = new Order({
            userId,
            items,
            totalPrice,
            status: 'pending'
        });

        await order.save();

        res.json({ success: true, message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
};

// Get order by ID
export const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id).populate('items');

        if (!order) {
            return res.json({ success: false, message: 'Order not found' });
        }

        res.json({ success: true, order });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
};

// Get orders by user ID
export const getUserOrders = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ userId }).populate('items');

        if (!orders) {
            return res.json({ success: false, message: 'No orders found for this user' });
        }

        res.json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findById(id);

        if (!order) {
            return res.json({ success: false, message: 'Order not found' });
        }

        order.status = status;

        await order.save();

        res.json({ success: true, message: 'Order status updated successfully', order });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
};
