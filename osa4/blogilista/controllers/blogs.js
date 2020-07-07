const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const config = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')

// Haetaan kaikki blogit
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { blogs: 0 })  // Piilotetaan käyttäjän blogit

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

// Lisätään uusi blogi tokenin avulla
blogsRouter.post('/', async (request, response, next) => {
  const reqBody = request.body
  const decodedToken = jwt.verify(request.token, config.SECRET)

  // Haetaan käyttäjä tokenista dekoodatun olion perusteella
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(401).json({ error: 'Invalid token - user not found' })
  }

  const blog = new Blog({
    title: reqBody.title,
    author: reqBody.author,
    url: reqBody.url,
    likes: reqBody.likes,
    user: user._id
  })

  // Tallenetaan blogiin ja käyttäjään tiedot blogin kirjoittajasta
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  response.status(201).json(savedBlog)
})

// Blogin poisto tokenin avulla
blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)

  // Jos blogia ei löytynyt
  if (!blog) {
    return response.status(404).end()
  }

  const decodedToken = jwt.verify(request.token, config.SECRET)

  // Varmistetaan tokenin ja blogin yhteneväisyys
  if (decodedToken.id !== blog.user.toString()) {
    return response.status(401).json({ error: 'Invalid token - no match' })
  }

  blog.remove()
  response.status(204).end()
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
    { new: true, runValidators: true })

  if (updatedBlog) {
    response.json(updatedBlog)
  }
  else {
    response.status(404).end()
  }
})

module.exports = blogsRouter
