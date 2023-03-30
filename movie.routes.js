const express = require('express');
const router = express.Router();
const Film = require('./movie.model');

// Create a film
router.post('/', async (req, res) => {
    try {
        const { title, description, releaseDate, director } = req.body;
        const film = new Film({ title, description, releaseDate, director });
        await film.save();
        res.status(201).json(film);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating film');
    }
});
// Update a film
router.put('/:id', async (req, res) => {
    try {
        const { title, description, releaseDate, director } = req.body;
        const updatedFilm = await Film.findByIdAndUpdate(req.params.id, {
            title,
            description,
            releaseDate,
            director,
            updatedAt: Date.now()
        });
        res.json(updatedFilm);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating film');
    }
});
// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
        if (req.user.role === 'admin') {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

// Protected routes for admin
router.post('/', isAdmin, async (req, res) => {
    // Create a film
});

router.put('/:id', isAdmin, async (req, res) => {
    // Update a film
});

router.delete('/:id', isAdmin, async (req, res) => {
    // Delete a film
});
// Add a film to favorites
router.post('/:id/favorites', async (req, res) => {
    try {
        const user = req.user;
        const filmId = req.params.id;

        if (user.favorites.includes(filmId)) {
            return res.status(400).send('Film already in favorites');
        }

        user.favorites.push(filmId);
        await user.save();
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding film');
    }
});
module.exports = router;
