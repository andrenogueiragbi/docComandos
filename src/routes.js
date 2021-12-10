const express = require('express');

const CategoryController = require('./controlers/CategoryControl')
const CommandController = require('./controlers/CommandsControl')

const routes = express.Router();

routes.get('/category', CategoryController.index);
routes.post('/category', CategoryController.store);
routes.put('/category/:category_id', CategoryController.update);
routes.delete('/category/:category_id', CategoryController.delete);

routes.get('/command/search', CommandController.searchCommands);
routes.get('/command', CommandController.index);
routes.post('/command', CommandController.store);
routes.put('/command/:command_id', CommandController.update);
routes.delete('/command/:command_id', CommandController.delete);




module.exports = routes;