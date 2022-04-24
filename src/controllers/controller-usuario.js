// const res = require("express/lib/response")
const res = require("express/lib/response")
const Usuario = require("../models/usuario")

 const usuario = (app, bd) => {
  app.get('/usuario', function(req, respo) {
    bd.all('SELECT * FROM USUARIOS', (error, rows) => {
      // Usando operador ternário para tornar o código mais limpo
      error ? respo.json('Erro na seleção do banco') : respo.json({"Banco de usuários": rows})
    })
  })

  app.get('/usuario/:email', function(req, respo) {
    // salva o parâmetro em uma variável
    const recebeEmail = req.params.email
    // percorre a array em busca o email passado como parâmetro
    for (let i = 0; i <= bd.length; i++) {
      // Devolve informações se encontrou ou não o email
      if ( bd[i].email == recebeEmail ) {
        console.log(`${recebeEmail} encontrado`)
        return res.json({"Email encontrado": `Posição ${i}`})
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

  app.put('/usuario/:nome', (req, respo) => {
    // Pego o parâmetro
    const nomeParametro = req.params.nome;
    // req.body é o corpo de onde são enviados os dados
    const body = req.body
    // Pego o index no banco de dados
    const indexUsuario = bd.usuario.findIndex(usuario => usuario.nome == nomeParametro)
    
    // If que verifica se encontrou o index
    if (indexUsuario > -1) {
      // Dados antigos do usuario
      const dadoAntigoUsuario = bd.usuario[indexUsuario]
      // Novos dados do usuario
        // Instanciamos uma nova classe para atualizar os dados do usuário
        // Se eu tenho um dado novo, ele entra no body.nome. Se eu não tenho dado novo (se o body for vazio), mantém o dado antigo
        // Uso "OU" para definir qual dado vou usar: Se body.nome for vazio, mantem a informação antiga
      const dadoNovoUsuario = new Usuario(
      body.nome || dadoAntigoUsuario.nome, 
      body.email || dadoAntigoUsuario.email,
      body.senha || dadoAntigoUsuario.senha,
      body.id || dadoAntigoUsuario.id // Fica com o ID antigo
      )

      // Remove dado antigo do usuário e adiciona o novo ao banco de dados
      const usuarioAtualizado = bd.usuario.splice(indexUsuario, 1, dadoNovoUsuario)

      respo.json({
        "Usuario Novo": dadoNovoUsuario,
        "Dados antigos": usuarioAtualizado
      })
    } else {
      respo.json(`Usuario não encontrado`)
    }
    respo.send(`Dado ${dadoNovoUsuario} atualizado`)
  })
}

module.exports = usuario