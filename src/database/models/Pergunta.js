const Sequelize = require('sequelize')
const connection = require('../connection')

const Pergunta = connection.define('pergunta', {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

Pergunta.sync({ force: false }).then(() => {
  console.log(`Tabela Pergunta criada com sucesso!`)
})

module.exports = Pergunta


