// import express from 'express';
// let app = express()
const express = require('express')
const app = express()

// body-parser
app.use(express.json())

// importa rotas 
const usuario = require('./controllers/controller-usuario')
const solicitante = require('./controllers/controller-solicitante')
const tarefa = require('./controllers/controller-tarefa')

// Importa banco de dados fictício
const bd = require("./infra/bd")

// executa arquivos importados; 
  // banco de dados (bd) foi integrado e os controllers foram modificados para receberem dados do bd
usuario(app, bd)
solicitante(app, bd)
tarefa(app, bd)

// importa classes
const Tarefa = require("./models/tarefa")
const Usuario = require("./models/usuario")

// instancia novas classe
// const tarefa1 = new Tarefa('Body Parser', 'Aprender sobre body-parser', 'em andamento', '18.04.2022')
// const usuarioTony = new Usuario('Tony', 'tony.email@gmail.com', '123456')


app.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000`);
})