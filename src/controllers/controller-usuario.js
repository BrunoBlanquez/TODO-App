// const res = require("express/lib/response")
const res = require("express/lib/response")
const Usuario = require("../models/usuario")
const UsuarioDAO = require("../dao/usuario-dao")

 const usuario = async (app, bd) => {
  // Instanciando usuário DAO para puxar os métodos
  const instanciaDAO = new UsuarioDAO(bd)

  app.get('/usuario', async (req, respo) => {
    // instanciaDAO.listarUsuarios()
    // .then((resposta) => {
    //   respo.status(200).json(resposta)
    // })
    // .catch((error) => {
    //   respo.json(error)
    // })

    // Usando Async e Await
    try {
      const listaUsuarios = await instanciaDAO.listarUsuarios()
      respo.send(listaUsuarios)
    } catch(erro) {
      respo.send(erro)
    }
  })

  app.get('/usuario/:email', function(req, respo) {
    // salva o parâmetro em uma variável
    const recebeEmail = req.params.email
    // percorre a array em busca o email passado como parâmetro
    for (let i = 0; i <= bd.length; i++) {
      // Devolve informações se encontrou ou não o email
      if ( bd[i].email == recebeEmail ) {
        console.log(`${recebeEmail} encontrado`)
        console.log(indexUsuario)
        return res.json({"Email encontrado": `Posição ${i}`})
      } console.log('Email não encontrado')
    }
    respo.json({"Email usuario": indexUsuario})
  })

  app.post('/usuario', async function(req, respo) {
    // Forma antiga, sem DAO
  //   try {
  //     // instancia um novo usuario usando a Class

  //     // Comando para o SQLite executar uma query (run)
  //       // Executando uma query para inserir algo no BD
  //     bd.run(`INSERT INTO USUARIOS (NOME, EMAIL, SENHA) VALUES (?, ?, ?)`, [novoUsuario.nome, novoUsuario.email, novoUsuario.senha],
  //     (error) => {
  //       error ? respo.json(error) : respo.json('Funfou, ta dentro')
  //     })
  //   } catch (error) {
  //     respo.json({"mensagem": error})
  //   }


  // USANDO DAO
  // const body = req.body
  // const novoUsuario = new Usuario(body.nome, body.email, body.senha)
  // await instanciaDAO.inserirUsuarios(novoUsuario)
  // .then((resposta) => {
  //     respo.status(201).json(resposta)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //     respo.json(error)
  //   })
  // })

  // Usando Async e Await
    const body = req.body
    const novoUsuario = new Usuario(body.nome, body.email, body.senha)
    try {
      const novoRegistroUsuario = await instanciaDAO.inserirUsuarios(novoUsuario)
      respo.send(novoRegistroUsuario)
    } catch(err) {
      respo.send(err)
    }
  })

  app.delete('/usuario/:id', async (req, respo) => {
    // Pego o ID no parâmetro
    const idUser = req.params.id;

    try {
      const registroDeletado = await instanciaDAO.deletarUsuarios(idUser)
      respo.send(registroDeletado)
    } 
    catch(error) {
      respo.send(error)
    }
  
  })

  // Versão antiga, sem DAO
  // app.delete('/usuario/:nome', (req, respo) => {
  //   const nomeParametro = req.params.nome;
  //   const indexUsuario = bd.usuarios.findIndex(usuarios => usuarios.nome == nomeParametro)
    
  //   // If que verifica se encontrou o index
  //   if (indexUsuario > -1) {
  //     // Uso splice para remover 1 item a partir da posição definida em indexUsuario
  //     const usuarioDeletado = bd.usuarios.splice(indexUsuario, 1)
  //     respo.json({"Usuario": usuarioDeletado})
  //     console.log(`Usuario de index ${indexUsuario} deletado`)
  //   } else {
  //     respo.json(`Usuario não encontrado`)
  //   }
  //   // respo.send(`Usuário: ${nomeParametro} deletado`)
  // })


  // UPDATE ANTIGO
  // app.put('/usuario/:nome', (req, respo) => {
    // Pego o parâmetro
  //   const nomeParametro = req.params.nome;
  //   // req.body é o corpo de onde são enviados os dados
  //   const body = req.body
  //   // Pego o index no banco de dados
  //   const indexUsuario = bd.usuario.findIndex(usuario => usuario.nome == nomeParametro)
    
  //   // If que verifica se encontrou o index
  //   if (indexUsuario > -1) {
  //     // Dados antigos do usuario
  //     const dadoAntigoUsuario = bd.usuario[indexUsuario]
  //     // Novos dados do usuario
  //       // Instanciamos uma nova classe para atualizar os dados do usuário
  //       // Se eu tenho um dado novo, ele entra no body.nome. Se eu não tenho dado novo (se o body for vazio), mantém o dado antigo
  //       // Uso "OU" para definir qual dado vou usar: Se body.nome for vazio, mantem a informação antiga
  //     const dadoNovoUsuario = new Usuario(
  //     body.nome || dadoAntigoUsuario.nome, 
  //     body.email || dadoAntigoUsuario.email,
  //     body.senha || dadoAntigoUsuario.senha,
  //     body.id || dadoAntigoUsuario.id // Fica com o ID antigo
  //     )

  //     // Remove dado antigo do usuário e adiciona o novo ao banco de dados
  //     const usuarioAtualizado = bd.usuario.splice(indexUsuario, 1, dadoNovoUsuario)

  //     respo.json({
  //       "Usuario Novo": dadoNovoUsuario,
  //       "Dados antigos": usuarioAtualizado
  //     })
  //   } else {
  //     respo.json(`Usuario não encontrado`)
  //   }
  //   respo.send(`Dado ${dadoNovoUsuario} atualizado`)
  // })

   app.put('/usuario/:id', async (req, respo) => {
    //  Pego o parâmetro
    // const nomeParametro = req.params.nome;
    // Pego o parâmetro
    const userID = req.params.id;
    // Novos dados
    const nomeNovo = req.body.nome
    const emailNovo = req.body.email
    const senhaNova = req.body.senha 
    
    try {
      const updateUser = await instanciaDAO.updateUsuario(userID, nomeNovo, emailNovo, senhaNova)
      respo.send(updateUser)
    } 
    catch(error) {
      respo.send(error)
    }
  })
}

module.exports = usuario