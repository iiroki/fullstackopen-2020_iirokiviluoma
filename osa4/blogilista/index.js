const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const url = config.MONGODB_URL

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

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})