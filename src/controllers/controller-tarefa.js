const res = require("express/lib/response")
const Tarefa = require("../models/tarefa")

 const tarefa = (app, bd) => {
  app.get('/tarefas', function(req, respo) {
    respo.send({"tarefas": bd.tarefa})
  })

  app.post('/tarefas', function(req, respo) {
    // respo.json(req.body.tarefa)
    try {
      const body = req.body

      // instancia uma nova tarefa usando a Class
      const novaTarefa = new Tarefa(body.titulo, body.descricao, body.status, body.data_criacao)

      // adiciona ao banco de dados
      bd.tarefa.push(novaTarefa)
      console.log(bd.usuario)

      // Resposta da requisição
      respo.json({ 
      "novaTarefa": novaTarefa, 
      "erro": false //Só pra me dizer que não teve erro
      })
    } catch (error) {
      res.json({"mensagem": error})
    }
  })
}

module.exports = tarefa
