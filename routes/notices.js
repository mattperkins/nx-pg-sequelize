const express = require('express')
const router = express.Router()
const Notice = require('../models/Notice')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// get list of notices : '/' is mapped to localhost:3006/notices from server.js
router.get('/', (req, res) => Notice.findAll()
  .then(notices => {
    // console.log(notices)
    // render view
    res.render('notices',
      {
        notices: notices.reverse()
      })
  })
  .catch(err => console.log(err)))

// Render Add Notice Form > views/add.hbs
router.get('/add', (req, res) => res.render('add'))

// Add a new Notice > localhost:3006/notices/add
router.post('/add', (req, res) => {
  // Corresponding form 'name' attributes < consume form 'body'
  let { title, keywords, price, description, contact } = req.body
  let errors = []

  // Validate Add Notice form fields
  if (!title) {
    errors.push({ text: 'A title is required' })
  }
  if (!keywords) {
    errors.push({ text: 'Keywords are required' })
  }
  if (!description) {
    errors.push({ text: 'A description is required' })
  }
  if (!contact) {
    errors.push({ text: 'Contact information is required' })
  }

  // Check for errors
  if (errors.length > 0) {
    // re-render the form displaying the errors and current form field input values
    res.render('add', {
      errors, title, keywords, description, price, contact
    })
  } else {
    if (!price) {
      price = 'N/A'
    } else {
      price = `£${price}`
    }
    // remove any spaces, fullstops or multiple commas and format to comma seperated
    keywords = keywords.toLowerCase().replace(/^[, ]+|[, ]+$|[, ]+|[, ]+$|[, ]+[.]+|[.]+/g, ' ').trim().replace(/\s+/g, ',')
    // ^[, ]+|[, ]+$|[, ]+
    // remove commas, multiple commas, or comma space
    // [.]+|[.]+
    // remove dots
    // /g
    // apply globally
    // replace with a space (for the next steps)
    // ' '
    // trim()
    // top and tail
    // /\s+/g, ','
    // global replace all strings of whitespace with commas

    // Insert form data into table
    Notice.create({
      title,
      keywords,
      price,
      description,
      contact
    })
      .then(peach => res.redirect('/notices'))
      .catch(err => console.log(err))
  }
})

// SEARCH for Notices
// this file puts us in the /notices/ route
router.get('/search', (req, res) => {
  // query = in url (address bar)
  let { term } = req.query

  // Force search query to lowercase
  term = term.toLowerCase()

  // analyse search query for any words that match the title, keyword or description
  Notice.findAll({ where: { [Op.or]: [ { title: { [Op.like]: '%' + term + '%' } }, { keywords: { [Op.like]: '%' + term + '%' } }, { description: { [Op.like]: '%' + term + '%' } } ] } })
    .then(notices => res.render('notices', { notices }))
    .catch(err => console.log(err))
})

module.exports = router
