const mailService = require('./mailService');

// Logique pour créer un nouvel utilisateur
const newUser = {
    name: 'John Doe',
    email: 'bennett50@ethereal.email',
    // autres informations de l'utilisateur
};

// Envoi d'un e-mail de bienvenue à l'utilisateur nouvellement créé
mailService.sendWelcomeEmail(newUser.email);
