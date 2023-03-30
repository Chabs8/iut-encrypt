const nodemailer = require('nodemailer');
require('dotenv').config();

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            }
        });
    }

    async sendWelcomeEmail(userEmail) {
        try {
            const message = {
                from: process.env.MAIL_USERNAME,
                to: userEmail,
                subject: 'Bienvenue !',
                text: 'Bonjour, nous sommes ravis que vous ayez créé un compte sur notre site !',
            };
            const info = await this.transporter.sendMail(message);
            console.log(`E-mail envoyé à ${userEmail}: ${info.messageId}`);
        } catch (error) {
            console.error(`Erreur lors de l'envoi de l'e-mail: ${error}`);
        }
    }

    async sendMail(to, subject, text) {
        const message = {
            from: process.env.MAIL_USERNAME,
            to,
            subject,
            text,
        };

        try {
            const info = await this.transporter.sendMail(message);
            console.log(`E-mail envoyé à ${to}: ${info.messageId}`);
        } catch (error) {
            console.error(`Erreur lors de l'envoi de l'e-mail: ${error}`);
        }
    }
}

module.exports = new MailService();
