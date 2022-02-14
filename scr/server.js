
//VARIAVEIS DO EXPRESS, SERVER E ROTAS
const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");

//MOTOR DO EJS
server.set('view engine', 'ejs');

//MUDAR A LOCALIZAÇÃO DA PASTA VIEWS
server.set("views", path.join(__dirname, "views"));

//CRIADOR DE ROTAS AUTOMATIZADAS DO EXPRESS, EM TODOS OS DIRETORIOS
server.use( express.static("public"));

//USAR O REQ BODY
server.use(express.urlencoded({ extended: true }));

//USANDO ROTA DO MODULE EXPORTS NA VARIAVEL SERVER
server.use(routes);




//CONECTANDO O SERVER
server.listen(3000, () => console.log('Servidor rodando'));