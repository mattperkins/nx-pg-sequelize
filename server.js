const { PORT, HOST, NODE_ENV } = process.env // yarn dev
const dbConnect = require('./db')
const express = require('express')

const bodyParser = require('body-parser')
const path = require('path')
const xhbs = require('express-handlebars')

// test DB
dbConnect.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Error:', err))

const app = express()

// Handlebars middleware
app.engine('hbs', xhbs(
  {
    // configure file suffix .hbs
    extname: '.hbs',
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, '/views/partials/')
  }))
app.set('view engine', 'hbs')
//

// Configure Static Folder
app.use(express.static(path.join(__dirname, 'public')))
//

// localhost:3006/index < index route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }))
//

// localhost:3006/notices < Notice routes
app.use('/notices', require('./routes/notices'))
//

app.listen(PORT || 3006, () => { if (NODE_ENV !== 'production') { console.log(`Server running on ${HOST} ${PORT}`) } })
