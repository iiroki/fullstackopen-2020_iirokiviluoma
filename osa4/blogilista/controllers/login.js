const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const config = require('../utils/config')
const User = require('../models/user')

// Kirjautumisyritys
loginRouter.post('/', async (request, response, next) => {
  const reqBody = request.body
  const user = await User.findOne({ username: reqBody.username })

  // Tarkastetaan salasanojen yhteneväisyys
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(reqBody.password, user.passwordHash)

  if (!user || !passwordCorrect) {
    return response.status(401).json({ error: 'Invalid username or password.' })
  }

  // Käyttäjä kivaan muotoon tokenia varten
  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, config.SECRET)
  response.json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
