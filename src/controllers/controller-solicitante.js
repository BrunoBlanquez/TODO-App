const res = require("express/lib/response")
const Solicitante = require("../models/solicitante")

 const solicitante = (app, bd) => {
  app.get('/solicitante', function(req, respo) {
    respo.send({"solicitantes": bd.solicitante})
  })

  app.get('/solicitante/:solicitante', function(req, respo) {
    respo.json({"solicitantes": bd.params.solicitante})
  })

  app.post('/solicitante', function(req, respo) {
    // respo.json(req.body.nome)

    try {
    const body = req.body

    // instancia um novo solicitante usando a Class
    const novoSolicitante = new Solicitante(body.nome, body.prazo)

    // adiciona ao banco de dados
    bd.solicitante.push(novoSolicitante)
    console.log(bd.solicitante)

    // Resposta da requisição
    respo.json({ 
      "novoSolicitante": novoSolicitante, 
      "erro": false //Só pra me dizer que não teve erro
      })
} catch (error) {
      res.json({"mensagem": error})
    }
  })

   app.delete('/solicitante/:nome', (req, respo) => {
    const nomeParametro = req.params.nome;
    const indexSolicitante = bd.solicitante.findIndex(solicitante => solicitante.nome == nomeParametro)
    
    // If que verifica se encontrou o index
    if (indexSolicitante > -1) {
      // Uso splice para remover 1 item a partir da posição definida em indexSolicitante
      const alunoDeletado = bd.solicitante.splice(indexSolicitante, 1)
      respo.json({"Solicitante": alunoDeletado})
      console.log(`Solicitante de index ${indexSolicitante} deletado`)
    } else {
      respo.json(`Solicitante não encontrado`)
    }
    respo.send(`Solicitante: ${nomeParametro} deletado`)
  })
}

module.exports = solicitante