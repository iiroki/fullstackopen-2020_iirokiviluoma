// Loggaa tapahtuman konsoliin.
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') console.log(...params)
}

// Loggaa virhetilanteen konsoliin.
const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') console.error(...params)
}

module.exports = {
  info,
  error
}