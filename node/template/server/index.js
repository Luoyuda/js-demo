const express = require('express');
const mongoose = require('mongoose');
const templateRouter = require('./routes/template')
const api = require('./middleware/api')
const bodyParser = require('body-parser')
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/template', {
  useNewUrlParser: true
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(api)
app.use('/xhr/v1', templateRouter)
app.use((req, res, next) =>{
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.listen(8080, () => {
  console.log('listening on port 8080')
})

module.exports = app