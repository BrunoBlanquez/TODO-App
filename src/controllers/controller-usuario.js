const res = require("express/lib/response")
const Usuario = require("../models/usuario")

 const usuario = (app, bd) => {
  app.get('/usuario', function(req, respo) {
    respo.json({"usuarios": bd.usuario})
  })

  app.post('/usuario', function(req, respo) {
    // respo.json(req.body.nome)

    try {
    const body = req.body
    // instancia um nova tarefa usando a Class
    const novoUsuario = new Usuario(body.nome, body.email, body.senha)

    // adiciona ao banco de dados
    bd.usuario.push(novoUsuario)
    console.log(bd.usuario)
    
    // Resposta da requisição
    respo.json({ 
      "novoUsuário": novoUsuario, 
      "erro": false //Só pra me dizer que não teve erro
      })

    } catch (error) {
      res.json({"mensagem": error})
    }
  })
}

module.exports = usuario