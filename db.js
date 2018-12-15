const DBURL = require('./keys')
const Sequelize = require('sequelize')

exports.dbConnect = new Sequelize(DBURL, {
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
