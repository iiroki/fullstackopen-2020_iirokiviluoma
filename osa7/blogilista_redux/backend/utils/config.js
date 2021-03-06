require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URL = process.env.MONGODB_URL

// Using test database when testing
if (process.env.NODE_ENV === 'test') {
  MONGODB_URL = process.env.TEST_MONGODB_URL
}

let SECRET = process.env.SECRET

module.exports = {
  MONGODB_URL,
  PORT,
  SECRET
}