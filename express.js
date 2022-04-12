import express from 'express';
let app = express()

// verbo http
app.get('/', function(req, respo) {
  respo.send('Hello world')
})

app.post('/', function(req, respo) {
  respo.send('Testando o Insomnia')
})

// rodar servidor na porta
app.listen(8000,() => {
  console.log('rodando na porta 8000')
})