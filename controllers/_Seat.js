// controllers/_Seat.js

import Screen from '../models/Screen.js';

// Get seats by screen
export const getSeatsByScreen = async (req, res) => {
    const { screenId } = req.params;

    try {
        const screen = await Screen.findById(screenId);

        if (!screen) {
            return res.json({ success: false, message: 'Screen not found' });
        }

        res.json({ success: true, seats: screen.seats });
    } catch (error) {
        console.error('Error fetching seats:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
};

// Update seat status
export const updateSeatStatus = async (req, res) => {
    const { id } = req.params;
    const { status, lockedUntil } = req.body;

    try {
        const screen = await Screen.findOne({ 'seats._id': id });

        if (!screen) {
            return res.json({ success: false, message: 'Seat not found' });
        }

        const seat = screen.seats.id(id);

        if (!seat) {
            return res.json({ success: false, message: 'Seat not found' });
        }

        seat.status = status;

        if (status === 'locked' && lockedUntil) {
            seat.lockedUntil = lockedUntil;
        } else {
            seat.lockedUntil = undefined;
        }

        await screen.save();

        res.json({ success: true, message: 'Seat status updated successfully', seat });
    } catch (error) {
        console.error('Error updating seat status:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
};
