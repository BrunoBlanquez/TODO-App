const res = require("express/lib/response")
const Solicitante = require("../models/solicitante")

 const solicitante = (app, bd) => {
  app.get('/solicitante', function(req, respo) {
    respo.send({"solicitantes": bd.solicitante})
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
}

module.exports = solicitante