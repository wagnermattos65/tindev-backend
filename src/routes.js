const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikesController');

const routes = express.Router();

routes.get('/', (req, res) => res.status(200).json({ message: `Server listen at port ${process.env.PORT}` }));

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.get('/likes', DevController.likes);
routes.get('/dislikes', DevController.dislikes);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes;
