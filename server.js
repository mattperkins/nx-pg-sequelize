const { PORT, HOST, NODE_ENV } = process.env

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('hello,world')
  console.log('Endpoint reached!')
})

app.listen(PORT || 3006, () => { if (NODE_ENV !== 'production') { console.log(`Server running on ${HOST} ${PORT}`) } })
