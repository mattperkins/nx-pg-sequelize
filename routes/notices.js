const express = require('express')
const router = express.Router()
const db = require('../db')
const Notice = require('../models/Notice')

// localhost:3006/notices > get Notices list
router.get('/', (req, res) => Notice.findAll()
  .then(notices => {
    console.log(notices)
    res.sendStatus(200)
  })
  .catch(err => console.log(err)))

// localhost:3006/notices/add > add new Notice
router.get('/add', (req, res) => {
  // test data
  const data = {
    title: 'All the leaves are brown',
    keywords: 'autumn, nature, song, music',
    price: 2000,
    description: 'Very much in keeping with what you had previously stated, i think.',
    contact: 'email@test.com'
  }

  let { title, keywords, price, description, contact } = data

  // Insert into table
  Notice.create({
    title,
    keywords,
    price,
    description,
    contact
  })
    .then(notice => res.redirect('/notices'))
    .catch(err => console.log(err))
})

module.exports = router
