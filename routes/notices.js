const express = require('express')
const router = express.Router()
const db = require('../db')
const Notice = require('../models/Notice')

// localhost:3006/notices > get Notices list
router.get('/', (req, res) => Notice.findAll()
  .then(notices => {
    console.log(notices)
    // render view
    res.render('notices',
      {
        notices
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
    // Insert form data into table
    Notice.create({
      title,
      keywords,
      price,
      description,
      contact
    })
      .then(notice => res.redirect('/notices'))
      .catch(err => console.log(err))
  }
})

module.exports = router
