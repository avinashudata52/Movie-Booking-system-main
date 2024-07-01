// controllers/_screen.js

import Screen from '../models/Screen.js';

// Get all screens
export async function getScreens(req, res) {
    try {
        const screens = await Screen.find().populate('movie');
        res.json({ success: true, screens });
    } catch (error) {
        console.error('Error fetching screens:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
}

// Get screen by ID
export async function getScreenById(req, res) {
    const { id } = req.params;
    try {
        const screen = await Screen.findById(id).populate('movie');
        if (!screen) {
            return res.json({ success: false, message: 'Screen not found' });
        }
        res.json({ success: true, screen });
    } catch (error) {
        console.error('Error fetching screen:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
}

// Create a new screen (admin only)
export async function createScreen(req, res) {
    const { name, address, movie, totalSeats, showtimes } = req.body;

    // Generate seats array based on totalSeats
    const seats = Array.from({ length: totalSeats }, (_, index) => ({
        seatIndex: index + 1,
    }));

    try {
        const newScreen = new Screen({ name, address, movie, totalSeats, seats, showtimes });
        await newScreen.save();
        res.json({ success: true, message: 'Screen created successfully', screen: newScreen });
    } catch (error) {
        console.error('Error creating screen:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
}


// Update a screen (admin only)
export async function updateScreen(req, res) {
    const { id } = req.params;
    const { name, address, movie, totalSeats, showtimes } = req.body;

    try {
        const screen = await Screen.findById(id);
        if (!screen) {
            return res.json({ success: false, message: 'Screen not found' });
        }

        // Handle seat count update
        let seats = [...screen.seats];
        const currentSeatCount = seats.length;

        if (totalSeats > currentSeatCount) {
            // Add new seats
            const newSeats = Array.from({ length: totalSeats - currentSeatCount }, (_, index) => ({
                seatIndex: currentSeatCount + index + 1,
                status: 'available',
                lockedUntil: null
            }));
            seats = seats.concat(newSeats);
        } else if (totalSeats < currentSeatCount) {
            // Remove excess seats
            seats = seats.slice(0, totalSeats);
        }

        // Update screen data
        const updatedScreen = await Screen.findByIdAndUpdate(
            id,
            { name, address, movie, totalSeats, seats, showtimes },
            { new: true }
        );
        
        if (!updatedScreen) {
            return res.json({ success: false, message: 'Screen not found' });
        }

        res.json({ success: true, message: 'Screen updated successfully', screen: updatedScreen });
    } catch (error) {
        console.error('Error updating screen:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
}


// Delete a screen (admin only)
export async function deleteScreen(req, res) {
    const { id } = req.params;
    try {
        const deletedScreen = await Screen.findByIdAndDelete(id);
        if (!deletedScreen) {
            return res.json({ success: false, message: 'Screen not found' });
        }
        res.json({ success: true, message: 'Screen deleted successfully' });
    } catch (error) {
        console.error('Error deleting screen:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
}
