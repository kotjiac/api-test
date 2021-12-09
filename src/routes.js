require('dotenv').config()
const express = require('express')
const expressValidator = require('express-validator')
const routes = express.Router()
const DenunciasController = require('./controllers/DenunciasController')
const CacheController = require('./controllers/CacheController')

routes.post('/cache',
  CacheController.cacheMiddleware,
  CacheController.getReverseGeocode
);

routes.post('/denuncias',
  DenunciasController.validate('create'),
  DenunciasController.create
);

routes.get('/denuncias',
  DenunciasController.list
);

module.exports = routes;
