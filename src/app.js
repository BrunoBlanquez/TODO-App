import express from 'express';
let app = express()
const solicitante = require('./controllers/solicitante');
const usuario = require('./controllers/usuario');

app.listen(3000, function() {
  console.log(`Servidor rodando na porta 3000`);
})