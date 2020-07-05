const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Haetaan kaikki blogit
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// Haetaan yksittäinen blogi
blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)

  // Tarkistetaan löytyikö blogi tietokannasta
  if (blog) {
    response.json(blog)
  }
  else {
    response.status(404).end()
  }
})

// Lisätään uusi blogi
blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

// Blogin poisto
blogsRouter.delete('/:id', async (request, response, next) => {
  const result = await Blog.findByIdAndRemove(request.params.id)
  if (result) {
    response.status(204).end()
  }
  else {
    response.status(404).end()
  }
})

// Blogin muokkaaminen
blogsRouter.put('/:id', async (request, response, next) => {
  const reqBody = request.body

  const blog = {
    title: reqBody.title,
    author: reqBody.author,
    url: reqBody.url,
    likes: reqBody.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog,
    {new: true, runValidators: true})

  if (updatedBlog) {
    response.json(updatedBlog)
  }
  else {
    response.status(404).end()
  }
})

module.exports = blogsRouter
