module.exports = (app) => {
  app.get('/solicitante', function(req, respo) {
    respo.send('Solicitante')
  })
}