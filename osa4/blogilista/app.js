const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const url = config.MONGODB_URL

// Yhdistetään MongoDB-tietokantaan
logger.info(`Connecting to MongoDB: ${url}`)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    logger.info(`Connected to MongoDB.`)
  })
  .catch((error) => {
    logger.error(`Connection error ${error.message}`)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

// Käytetään omaa reittien käsittelijää
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
