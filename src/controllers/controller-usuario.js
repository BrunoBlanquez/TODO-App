// const res = require("express/lib/response")
const Usuario = require("../models/usuario")

 const usuario = (app, bd) => {
  app.get('/usuario', function(req, respo) {
    respo.json({"usuarios": bd.usuario})
  })

  app.get('/usuario/:email', function(req, respo) {
    // salva o parâmetro em uma variável
    const recebeEmail = req.params.email
    // percorre a array em busca o email passado como parâmetro
    for (let i = 0; i <= bd.length; i++) {
      // Devolve informações se encontrou ou não o email
      if ( bd[i].email == recebeEmail ) {
        console.log(`${recebeEmail} encontrado`)
      } console.log('Email não encontrado')
    }
    respo.json({"Email usuario": req.params.email})
  })

  app.post('/usuario', function(req, respo) {
    try {
    const body = req.body
    // instancia um novo usuario usando a Class
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
      resp.json({"mensagem": error})
    }
  })

  app.delete('/usuario/:nome', (req, respo) => {
    const nomeParametro = req.params.nome;
    const indexUsuario = bd.usuario.findIndex(usuario => usuario.nome == nomeParametro)
    
    // If que verifica se encontrou o index
    if (indexUsuario > -1) {
      // Uso splice para remover 1 item a partir da posição definida em indexUsuario
      const usuarioDeletado = bd.usuario.splice(indexUsuario, 1)
      respo.json({"Usuario": usuarioDeletado})
      console.log(`Usuario de index ${indexUsuario} deletado`)
    } else {
      respo.json(`Usuario não encontrado`)
    }
    respo.send(`Usuário: ${nomeParametro} deletado`)
  })
}

module.exports = usuario