const Sq = require('sequelize')
const db = require('../db')

const Notice = db.define('notice', {
  title: { type: Sq.STRING },
  keywords: { type: Sq.STRING },
  price: { type: Sq.STRING },
  description: { type: Sq.STRING },
  contact: { type: Sq.STRING }
})

module.exports = Notice
