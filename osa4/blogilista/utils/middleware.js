const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info(`Method: ${request.method}`)
  logger.info(`Path:   ${request.path}`)
  logger.info(`Body:   ${JSON.stringify(request.body)}`)
  logger.info(`-----`)
  next()
}

// Virheidenkäsittelijä
const errorHandler = (error, request, respone, next) => {
  logger.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return respone.status(400).send({ error: 'Bad id'})
  }
  else if (error.name === 'ValidationError') {
    return respone.status(400).json({ error: error.message})
  }
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint'})
}

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint
}
