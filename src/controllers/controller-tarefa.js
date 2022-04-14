module.exports = (app) => {
  app.get('/tarefas', function(req, respo) {
    respo.send(`Tarefa`)
  })
  app.post('/tarefas', function(req, respo) {
    respo.json(req.body.tarefa)
  })
}
