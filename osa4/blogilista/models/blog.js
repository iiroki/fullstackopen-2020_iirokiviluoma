const mongoose = require('mongoose')

// Blogin attribuutit
const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: Number
})

module.exports = mongoose.model('Blog', blogSchema)
