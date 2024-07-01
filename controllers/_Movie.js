// controllers/_Movie.js
import Movie from '../models/Movie.js';

// Get all movies
export async function getMovies(req, res) {
    try {
        const movies = await Movie.find();
        res.json({ success: true, movies });
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
}

// Get movie by ID
export async function getMovieById(req, res) {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.json({ success: false, message: 'Movie not found' });
        }
        res.json({ success: true, movie });
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
}

// Create a new movie (admin only)
export async function createMovie(req, res) {
    const { title, genre, duration, description } = req.body;
    try {
        const newMovie = new Movie({ title, genre, duration, description });
        await newMovie.save();
        res.json({ success: true, message: 'Movie created successfully', movie: newMovie });
    } catch (error) {
        console.error('Error creating movie:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
}

// Update a movie (admin only)
export async function updateMovie(req, res) {
    const { id } = req.params;
    const { title, genre, duration, description, showtimes } = req.body;
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(id, { title, genre, duration, description, showtimes }, { new: true });
        if (!updatedMovie) {
            return res.json({ success: false, message: 'Movie not found' });
        }
        res.json({ success: true, message: 'Movie updated successfully', movie: updatedMovie });
    } catch (error) {
        console.error('Error updating movie:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
}

// Delete a movie (admin only)
export async function deleteMovie(req, res) {
    const { id } = req.params;
    try {
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) {
            return res.json({ success: false, message: 'Movie not found' });
        }
        res.json({ success: true, message: 'Movie deleted successfully' });
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
}
