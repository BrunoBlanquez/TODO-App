const { response } = require("express")

class UsuarioDAO {
  constructor(bd) {
    this.bd = bd
  }

  listarUsuarios() {
    return new Promise((resolve, reject) => {
      this.bd.all('SELECT * FROM USUARIOS', (error, rows) => {
        error ? reject('Erro na seleção do banco') : resolve({"Banco de usuários": rows})
      })
    })
  }

  inserirUsuarios(novoUsuario) {
    return new Promise((resolve, reject) => {
      this.bd.run(`INSERT INTO USUARIOS (NOME, EMAIL, SENHA) VALUES (?, ?, ?)`, [novoUsuario.nome, novoUsuario.email, novoUsuario.senha], (error) => {
        error ? reject(error) : resolve('Funfou, ta dentro')
      })
    })
  }

  updateUsuario(userID, nomeNovo, emailNovo, senhaNova) {
    return new Promise((resolve, reject) => {
      this.bd.run(`UPDATE USUARIOS SET nome = ?, email = ?, senha = ? where id = ${userID}`, [nomeNovo, emailNovo, senhaNova], (error) => {
        error ? reject(error) : resolve('Vald lindo')
      })
    })
  } 

  deletarUsuarios(idUser) {
    // If que verifica se encontrou o index
    return new Promise((resolve, reject) => {
      if (idUser > -1) {
        this.bd.run(`DELETE FROM USUARIOS WHERE ID = ${idUser}`, (error) => {
          error ? reject(error) : resolve(`Usuário de ID ${idUser} deletado`)
        })
      }
    })
  }
}

module.exports = UsuarioDAO