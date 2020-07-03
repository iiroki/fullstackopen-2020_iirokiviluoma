const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Haetaan kaikki blogit
blogsRouter.get('/', (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs)
    })
})

// Lisätään uusi blogi
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter
