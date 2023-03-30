const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const movieRoutes = require('./movie.routes'); // importer les routes de movie

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', movieRoutes); // utiliser les routes de movie

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port http://localhost:3000`);
});
