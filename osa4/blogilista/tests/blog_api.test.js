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
    .get('api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  // Suljetaan tietokantayhteys testien jälkeen
  mongoose.connection.close()
})
