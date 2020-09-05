const express = require('express')
const connection = require('./database/connection')
const Pergunta = require('./database/models/Pergunta')
const Resposta = require('./database/models/Resposta')
const app = express()

connection.authenticate()
  .then(() => {
    console.log(`Database OK`)
  })
  .catch(err => {
    console.log(`Algo deu errado com a conexao com o banco`, err)
  })

app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const perguntas = await Pergunta.findAll({ raw: true, order: [['createdAt', 'DESC']] })
  const quantidadePerguntas = await Pergunta.count()
  res.render('index', { perguntas, quantidadePerguntas })
})

app.get('/perguntar', (req, res) => {
  res.render('perguntar')
})

app.post('/salvarpergunta', (req, res) => {
  const { titulo, descricao } = req.body
  Pergunta.create({ titulo, descricao }).then(() => {
    res.redirect('/')
  })
})

app.get('/pergunta/:id', async (req, res) => {
  const { id } = req.params
  await Pergunta.findOne({ where: { id } })
    .then(async (pergunta) => {
      const respostas = await Resposta.findAll({ where: { perguntaId: id }, order: [['createdAt', 'DESC']] })
      res.render('pergunta', { pergunta, respostas })
    })
})

app.post('/salvarresposta', (req, res) => {
  const { corpo, perguntaId } = req.body
  Resposta.create({ corpo, perguntaId })
  res.redirect(`/pergunta/${perguntaId}`)
})

app.listen(3000, () => {
  console.log('Server rodando!')
})