const Sq = require('sequelize')
const db = require('./db')

const Notice = db.define('notice', {
  title: { type: Sq.String },
  keywords: { type: Sq.String },
  price: { type: Sq.String },
  description: { type: Sq.String },
  contact: { type: Sq.String },
  image: { type: Sq.String }
})

module.exports = Notice
