
//BIBLIOTECA PARA CRIAR O SERVIDOR
const express = require("express");
const routes = express.Router();
const ProfileController = require('./controller/ProfileController');
const JobsController = require('./controller/JobsController');
const DashboardController = require('./controller/dashboardController');



//CRIAR ROTAS
//RESPONSE REQUEST
routes.get('/', DashboardController.index);
routes.get('/job', JobsController.create);

//METODO POST
routes.post('/job', JobsController.save);

routes.get('/job/:id', JobsController.show);
routes.post('/job/:id', JobsController.update);

//DELETAR
routes.post('/job/delete/:id', JobsController.delete);

routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);

module.exports = routes;