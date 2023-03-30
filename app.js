const mailService = require('./mailService');

// Logique pour créer un nouvel utilisateur
const newUser = {
    name: 'John Doe',
    email: 'bennett50@ethereal.email',
    // autres informations de l'utilisateur
};

// Envoi d'un e-mail de bienvenue à l'utilisateur nouvellement créé
mailService.sendWelcomeEmail(newUser.email);


const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/movies'; // le nom de la base de données est "movies"

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
