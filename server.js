const { PORT, HOST, NODE_ENV } = process.env // yarn dev
const { dbConnect } = require('./db')
const express = require('express')
const app = express()

// const bodyParser = require('body-parser')
// const path = require('path')
// const hbs = require('express-handlebars')

// test DB
dbConnect.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Error:', err))

app.get('/', (req, res) => {
  res.send('hello,world')
  console.log('Endpoint reached!')
})

app.listen(PORT || 3006, () => { if (NODE_ENV !== 'production') { console.log(`Server running on ${HOST} ${PORT}`) } })
