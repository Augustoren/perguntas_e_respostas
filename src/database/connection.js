const Sequelize = require('sequelize')
const connection = new Sequelize('perguntas_e_respostas', 'root', 'augustoren', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = connection