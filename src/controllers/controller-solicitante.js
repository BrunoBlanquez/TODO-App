module.exports = (app) => {
  app.get('/solicitante', function(req, respo) {
    respo.send('Solicitantes')
  })
  app.post('/solicitante', function(req, respo) {
    respo.json(req.body.nome)
  })
}