module.exports = (app) => {
  app.get('/usuario', function(req, respo) {
    respo.send('usuario')
  })
}