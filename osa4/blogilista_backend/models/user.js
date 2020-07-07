const mongoose = require('mongoose')
const uValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true  // Ei sallita duplikaatteja
  },
  passwordHash: {
    type: String,  // Salasanan validointi suoritetaan muualla!
    required: true
  },
  name: {
    type: String
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    default: []
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uValidator)

module.exports = mongoose.model('User', userSchema)
