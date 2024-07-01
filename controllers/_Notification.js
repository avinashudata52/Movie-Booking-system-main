// controllers/notificationController.js

import Notification from '../models/Notification.js'


// Get notifications for a specific user
export const getUserNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        const notifications = await Notification.find({ userId });

        if (!notifications) {
            return res.json({ success: false, message: 'No notifications found for this user' });
        }

        res.json({ success: true, notifications });
    } catch (error) {
        console.error('Error fetching user notifications:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
};

// Mark a notification as read
export const markNotificationAsRead = async (req, res) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findById(id);

        if (!notification) {
            return res.json({ success: false, message: 'Notification not found' });
        }

        notification.status = 'read';

        await notification.save();

        res.json({ success: true, message: 'Notification marked as read', notification });
    } catch (error) {
        console.error('Error updating notification status:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
};
