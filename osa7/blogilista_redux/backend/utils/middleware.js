const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info(`Method: ${request.method}`)
  logger.info(`Path:   ${request.path}`)
  logger.info(`Body:   ${JSON.stringify(request.body)}`)
  logger.info(`-----`)
  next()
}

// Own error handler
const errorHandler = (error, request, respone, next) => {
  logger.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return respone.status(400).json({ error: 'Bad id' })
  }
  else if (error.name === 'ValidationError') {
    return respone.status(400).json({ error: error.message })
  }
  else if (error.name === 'JsonWebTokenError') {
    return respone.status(401).json({ error: 'Invalid token' })
  }

  logger.error(error.message)
  next(error)  // Express' error handler
}

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'Unknown endpoint' })
}

// Extracting token from request
const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request.token = auth.substring(7)
  }
  else {
    request.token = null
  }

  next()
}

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
  tokenExtractor
}
