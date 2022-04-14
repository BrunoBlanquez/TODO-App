module.exports = (app) => {
  app.get('/usuario', function(req, respo) {
    respo.send('usuario')
  })
  app.post('/usuario', function(req, respo) {
    respo.json(req.body.nome)
  })
}