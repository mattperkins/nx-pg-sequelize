const express = require('express')
const router = express.Router()
const db = require('../db')
const Notice = require('../models/Notice')

// /notices
router.get('/', (req, res) => Notice.findAll()
  .then(notices => {
    console.log(notices)
    res.sendStatus(200)
  })
  .catch(err => console.log(err)))

module.exports = router
