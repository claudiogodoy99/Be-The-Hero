const express = require('express');

const OngController = require('./controllers/OngController');
const incidentsController = require('./controllers/IncidentsController');
const ProfilleController = require('./controllers/ProfilleController');
const sessionsController= require('./controllers/sessionsController');

const routes = express.Router();

routes.get('/profille',ProfilleController.index);

routes.post('/sessions',sessionsController.Create);

routes.get('/incidents',incidentsController.Index);
routes.post('/incidents',incidentsController.Create);
routes.delete('/incidents/:id', incidentsController.Delete);

routes.get('/ongs',OngController.Index);
routes.post('/ongs',OngController.Create);

module.exports = routes;
