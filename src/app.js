const express = require('express')
const app = express()

// body-parser
app.use(express.json())

// importa rotas 
const usuario = require('./controllers/controller-usuario')
const tarefa = require('./controllers/controller-tarefa')

// Importa banco de dados do SQLite
const bd = require("./infra/sqlite-db")

// executa arquivos importados; 
  // banco de dados (bd) foi integrado e os controllers foram modificados para receberem dados do bd
usuario(app, bd)
tarefa(app, bd)

app.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000`);
})