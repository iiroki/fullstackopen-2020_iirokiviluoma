const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const config = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')
const { request } = require('express')

// Fetching all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { blogs: 0 })  // Hide blogs

  response.json(blogs)
})

// Fetching a single blog
blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog
    .findById(request.params.id).populate('user', { blogs: 0 })

  // Whether blog was found or not
  if (blog) {
    response.json(blog)
  }
  else {
    response.status(404).end()
  }
})

// Adding a new blog with token
blogsRouter.post('/', async (request, response, next) => {
  const reqBody = request.body
  const decodedToken = jwt.verify(request.token, config.SECRET)

  // Fetching user based on decoded token
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

  const savedBlog = await blog.save()
  await savedBlog.populate('user', { blogs : 0 }).execPopulate()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  response.status(201).json(savedBlog)
})

// Removing a blog with token
blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)

  // Blog not found
  if (!blog) {
    return response.status(404).end()
  }

  const decodedToken = jwt.verify(request.token, config.SECRET)

  // Check token match
  if (decodedToken.id !== blog.user.toString()) {
    return response.status(401).json({ error: 'Invalid token - no match' })
  }

  blog.remove()
  response.status(204).end()
})

// Modifying a blog
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

  // Blog to update not found
  if (!updatedBlog) {
    return response.status(404).end()
  }

  await updatedBlog.populate('user', { blogs : 0 }).execPopulate()
  response.json(updatedBlog)

})

// Commenting a blog
blogsRouter.post('/:id/comments', async (request, response, next) => {
  const reqBody = request.body

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  blog.comments = blog.comments.concat(reqBody.comment)
  const commentedBlog = await blog.save()
  await commentedBlog.populate('user', { blogs : 0 }).execPopulate()
  response.json(commentedBlog)
})

module.exports = blogsRouter
