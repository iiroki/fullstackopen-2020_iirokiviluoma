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
    return respone.status(400).json({ error: 'Bad id'})
  }
  else if (error.name === 'ValidationError') {
    return respone.status(400).json({ error: error.message})
  }
  else if (error.name === 'JsonWebTokenError') {
    return respone.status(401).json({ error: 'Invalid token'})
  }

  logger.error(error.message)
  next(error)  // Expressis virheenkäsittelijä
}

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'Unknown endpoint'})
}

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint
}
