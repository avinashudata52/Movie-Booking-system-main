// controllers/_booking.js

import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Movie from '../models/Movie.js';
import Screen from '../models/Screen.js';

// Generate a unique 5-digit ticket ID
const generateUniqueTicketId = async () => {
    let unique = false;
    let ticketId;

    while (!unique) {
        ticketId = Math.floor(10000 + Math.random() * 90000);
        const existingBooking = await Booking.findOne({ ticketId });
        if (!existingBooking) {
            unique = true;
        }
    }

    return ticketId;
}

// Create a new booking
export async function createBooking(req, res) {
    const { userId, movieId, screenId, seatNumbers, showtime, totalPrice } = req.body;

    try {
        // Check if user, movie, and screen exist
        const user = await User.findById(userId);
        const movie = await Movie.findById(movieId);
        const screen = await Screen.findById(screenId);

        if (!user || !movie || !screen) {
            return res.json({ success: false, message: 'User, Movie, or Screen not found' });
        }

        // Check if seats are available
        const availableSeats = screen.seats.filter(seat => seatNumbers.includes(seat.seatIndex) && seat.status === 'available');
        if (availableSeats.length !== seatNumbers.length) {
            return res.json({ success: false, message: 'Some seats are not available' });
        }

        // Lock the seats
        availableSeats.forEach(seat => seat.status = 'locked');
        await screen.save();

        // Create the booking
        const booking = new Booking({
            ticketId: generateUniqueTicketId(),
            userId,
            movieId,
            screenId,
            seatNumbers,
            showtime,
            totalPrice,
            paymentStatus: 'pending'
        });

        await booking.save();

        res.json({ success: true, message: 'Booking created successfully', booking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
}

// Get booking by ID
export async function getBookingById(req, res) {
    const { id } = req.params;
    try {
        const booking = await Booking.findById(id).populate('userId movieId screenId');
        if (!booking) {
            return res.json({ success: false, message: 'Booking not found' });
        }
        res.json({ success: true, booking });
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
}

// Get all bookings for a user
export async function getUserBookings(req, res) {
    const { userId } = req.params;
    try {
        const bookings = await Booking.find({ userId }).populate('movieId screenId');
        res.json({ success: true, bookings });
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
}

// Cancel a booking
export async function cancelBooking(req, res) {
    const { id } = req.params;
    try {
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.json({ success: false, message: 'Booking not found' });
        }

        // Change the status of the seats back to 'available'
        const screen = await Screen.findById(booking.screenId);
        screen.seats.forEach(seat => {
            if (booking.seatNumbers.includes(seat.seatIndex)) {
                seat.status = 'available';
            }
        });
        await screen.save();

        await booking.remove();
        res.json({ success: true, message: 'Booking cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
}
