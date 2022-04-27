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

  updateUsuario() {

  }

  deletarUsuarios() {

  }
}

module.exports = UsuarioDAO