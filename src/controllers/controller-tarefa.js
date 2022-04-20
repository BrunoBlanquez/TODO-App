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

  app.put('/tarefa/:titulo', (req, respo) => {
    // Pego o parâmetro
    const tituloParametro = req.params.titulo;
    // req.body é o corpo de onde são enviados os dados
    const body = req.body
    // Pego o index no banco de dados
    const indexTarefa = bd.tarefa.findIndex(tarefa => tarefa.titulo == tituloParametro)
    
    // If que verifica se encontrou o index
    if (indexTarefa > -1) {
      // Dados antigos do usuario
      const dadoAntigoTarefa = bd.tarefa[indexTarefa]
      // Novos dados do usuario
        // Instanciamos uma nova classe para atualizar os dados do usuário
        // Se eu tenho um dado novo, ele entra no body.nome. Se eu não tenho dado novo (se o body for vazio), mantém o dado antigo
        // Uso "OU" para definir qual dado vou usar: Se body.nome for vazio, mantem a informação antiga
      const dadoNovaTarefa = new Tarefa(
      body.titulo || dadoAntigoTarefa.titulo, 
      body.descricao || dadoAntigoTarefa.descricao,
      body.status || dadoAntigoTarefa.status,
      body.data_criacao || dadoAntigoTarefa.data_criacao
      )
      // Remove dado antigo do usuário e adiciona o novo ao banco de dados
      const TarefaAtualizada = bd.tarefa.splice(indexTarefa, 1, dadoNovaTarefa)

      respo.json({
        "Tarefa Nova": dadoNovaTarefa,
        "Dados antigos": TarefaAtualizada
      })
    } else {
      respo.json(`Tarefa não encontrada`)
    }
    respo.send(`Dado ${dadoNovaTarefa} atualizado`)
  })
}

module.exports = tarefa
