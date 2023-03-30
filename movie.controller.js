const Movie = require('./movie.model');
const mailService = require('./mailService');
// Fonction pour créer un nouveau film
async function createMovie(req, res) {
    try {
        // Vérifie si l'utilisateur est admin
        if (req.user.role !== 'admin') {
            return res.status(403).send({ message: 'Vous n\'êtes pas autorisé à créer un film.' });
        }

        // Crée un nouveau film avec les données fournies
        const movie = new Movie({
            title: req.body.title,
            description: req.body.description,
            releaseDate: req.body.releaseDate,
            director: req.body.director,
        });

        // Enregistre le film dans la base de données
        const savedMovie = await movie.save();

        res.status(201).send(savedMovie);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Une erreur s\'est produite lors de la création du film.' });
    }
}

// Fonction pour ajouter un film à la liste de favoris de l'utilisateur
async function addMovieToFavorites(req, res) {
    try {
        // Récupère l'utilisateur en fonction de son ID
        const user = await User.findById(req.user._id);

        // Vérifie si le film est déjà présent dans la liste de favoris de l'utilisateur
        if (user.favoriteMovies.includes(req.params.movieId)) {
            return res.status(400).send({ message: 'Ce film est déjà présent dans votre liste de favoris.' });
        }

        // Ajoute le film à la liste de favoris de l'utilisateur
        user.favoriteMovies.push(req.params.movieId);

        // Enregistre les modifications dans la base de données
        await user.save();

        res.status(200).send({ message: 'Le film a été ajouté à votre liste de favoris.' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Une erreur s\'est produite lors de l\'ajout du film à votre liste de favoris.' });
    }
}

// Fonction pour supprimer un film de la liste de favoris de l'utilisateur
async function removeMovieFromFavorites(req, res) {
    try {
        // Récupère l'utilisateur en fonction de son ID
        const user = await User.findById(req.user._id);

        // Vérifie si le film est présent dans la liste de favoris de l'utilisateur
        if (!user.favoriteMovies.includes(req.params.movieId)) {
            return res.status(400).send({ message: 'Ce film n\'est pas présent dans votre liste de favoris.' });
        }

        // Supprime le film de la liste de favoris de l'utilisateur
        user.favoriteMovies = user.favoriteMovies.filter((movieId) => movieId !== req.params.movieId);

        // Enregistre les modifications dans la base de données
        await user.save();

        res.status(200).send({ message: 'Le film a été supprimé de votre liste de favoris.' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Une erreur s\'est produite lors de la suppression du film de votre liste de favoris.' });
    }
}
// movie.controller.js

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

exports.createMovie = async (req, res) => {
    // création du film
    const newMovie = new Movie(req.body);
    await newMovie.save();

    // envoi de notification par e-mail aux utilisateurs
    const users = await User.find({ role: 'user', favoriteMovies: { $in: newMovie._id } });
    const mailOptions = {
        from: 'notifier@example.com',
        to: users.map(user => user.email),
        subject: `Nouveau film ajouté : ${newMovie.title}`,
        text: `Le film ${newMovie.title} a été ajouté à la bibliothèque de films.`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Notification envoyée : ' + info.response);
        }
    });

    res.status(201).json(newMovie);
};

exports.updateMovie = async (req, res) => {
    // mise à jour du film
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // envoi de notification par e-mail aux utilisateurs
    const users = await User.find({ role: 'user', favoriteMovies: { $in: updatedMovie._id } });
    const mailOptions = {
        from: 'notifier@example.com',
        to: users.map(user => user.email),
        subject: `Film modifié : ${updatedMovie.title}`,
        text: `Le film ${updatedMovie.title} a été modifié dans la bibliothèque de films.`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Notification envoyée : ' + info.response);
        }
    });

    res.json(updatedMovie);
};

module.exports = {
    createMovie,
    addMovieToFavorites,
    removeMovieFromFavorites,
};
