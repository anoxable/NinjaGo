const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes/api')

// set up express app
const app = express()
// connect to mongodb
mongoose.connect('mongodb://localhost/ninjago')
mongoose.Promise = global.Promise
// server static file
app.use(express.static('public'))

app.use(bodyParser.json())

app.use('/api', routes)
// error handling middleware

app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message })
})
// listen for requests
app.listen(process.env.port || 4000, function () {
  console.log('now listening for requests')
})
