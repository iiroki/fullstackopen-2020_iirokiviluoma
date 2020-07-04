const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Haetaan kaikki blogit
blogsRouter.get('/', (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Lisätään uusi blogi
blogsRouter.post('/', (request, response, next) => {
  const newBlog = new Blog(request.body)

  newBlog.save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
