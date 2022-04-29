const express = require('express')
const app = express()
const cors = require('cors')

// Usando CORS
app.use(cors())

// body-parser
app.use(express.json())

// importa rotas 
const usuario = require('./controllers/controller-usuario')
const tarefa = require('./controllers/controller-tarefa')

// Importa banco de dados do SQLite
const bd = require("./infra/sqlite-db")
const { response } = require('express')

// executa arquivos importados; 
  // banco de dados (bd) foi integrado e os controllers foram modificados para receberem dados do bd
usuario(app, bd)
tarefa(app, bd)

// Testando fetch
// fetch("http://localhost:3000/usuario")
//     .then((response) => {
//       return response.json()
//     }).then((data) => {
//       console.log(data)
//     })

app.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000`);
})