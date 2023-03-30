# Nom de l'application

Description de l'application.

## Installation

1. Clonez le repository : `git clone https://github.com/votre-username/nom-de-l-application.git`
2. Installez les dépendances : `npm install`
3. Créez un fichier `.env` en vous basant sur le fichier `.env.example` et renseignez les variables d'environnement.

## Variables d'environnement

- `PORT`: le port sur lequel le serveur doit écouter (par défaut : `3000`).
- `MONGO_URI`: l'URI de la base de données MongoDB à utiliser.
- `SECRET_KEY`: la clé secrète utilisée pour générer les tokens JWT.

## Utilisation

1. Lancez l'application : `npm start`
2. Accédez à l'application dans votre navigateur à l'adresse `http://localhost:{PORT}`.

## Routes

- `POST /api/films`: ajouter un film à la base de données.
- `PUT /api/films/:id`: mettre à jour les informations d'un film existant.
- `DELETE /api/films/:id`: supprimer un film de la base de données.
- `POST /api/films/:id/favorites`: ajouter un film aux favoris d'un utilisateur.

## Auteurs

- Nom de l'auteur 1 (@username)
- Nom de l'auteur 2 (@username)

## Licence

Ce projet est sous licence MIT.
