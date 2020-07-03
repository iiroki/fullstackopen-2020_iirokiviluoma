const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
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
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})