// import express from 'express';
// let app = express()
const express = require('express')
const app = express()

// body-parser
app.use(express.json())

const usuario = require('./controllers/controller-usuario')
const solicitante = require('./controllers/controller-solicitante')
const tarefa = require('./controllers/controller-tarefa')

usuario(app)
solicitante(app)
tarefa(app)

app.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000`);
})