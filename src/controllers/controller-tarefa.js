// const res = require("express/lib/response")
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
      respo.json({"mensagem": error})
    }
  })

   app.delete('/tarefa/:nome', (req, respo) => {
    const nomeParametro = req.params.nome;
    const indexTarefa = bd.tarefa.findIndex(tarefa => tarefa.nome == nomeParametro)
    
    // If que verifica se encontrou o index
    if (indexUsuario > -1) {
      // Uso splice para remover 1 item a partir da posição definida em indexTarefa
      const tarefaDeletada = bd.tarefa.splice(indexTarefa, 1)
      respo.json({"Tarefa": tarefaDeletada})
      console.log(`Tarefa de index ${indexTarefa} deletada`)
    } else {
      respo.json(`Tarefa não encontrado`)
    }
    respo.send(`Tarefa: ${nomeParametro} deletada`)
  })
}

module.exports = tarefa
