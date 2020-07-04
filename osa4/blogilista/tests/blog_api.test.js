const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

// Kääritään app "superagent"-olioksi
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('Notes are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('All notes are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('Specific blog is found within returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(t => t.title)
  const specificTitle = helper.initialBlogs[0].title
  expect(titles).toContain(specificTitle)
})

afterAll(() => {
  // Suljetaan tietokantayhteys testien jälkeen
  mongoose.connection.close()
})
