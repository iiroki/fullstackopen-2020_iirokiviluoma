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

// Blogien hakemiseen liittyvät testit
describe('Fetching all blogs from database', () => {
  test('Blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })

  test('All blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('Specific blog is found within returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(t => t.title)
    const specificTitle = helper.initialBlogs[0].title
    expect(titles).toContain(specificTitle)
  })

  test('Returned blogs have id-attribute (NOT _id)', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('Fetching specific blog from database', () => {
  test('Succeeds with valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blog = blogsAtStart[0]

    const result = await api
      .get(`/api/blogs/${blog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body).toEqual(blog)
  })

  test('Statuscode 404 with valid non-existing id', async () => {
    const id = await helper.validNonExistingId()

    const result = await api
      .get(`/api/blogs/${id}`)
      .expect(404)
  })

  test('Statuscode 400 with invalid id', async () => {
    const id = helper.invalidId

    const result = await api
    .get(`/api/blogs/${id}`)
    .expect(400)
  })
})

// Blogin lisäämiseen liittyvät testit
describe('Adding blogs to database', () => {
  test('Succeeds with valid data', async () => {
    const blogToAdd = {
      title: 'Testilisäys',
      author: 'Teppo Testaaja',
      url: 'www.testiblogix.com',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    // Tietokannan blogien määrä kasvaa yhdellä
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    // Lisätty blogi löytyy tietokannasta
    const blogTitles = blogsAtEnd.map(b => b.title)
    expect(blogTitles).toContain(blogToAdd.title)
  })

  test('Statuscode 400 with invalid data', async () => {
    const blogToAdd = {
      // Ei titleä
      author: 'Blog',
      // Ei urlia
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(blogToAdd)
      .expect(400)
  })

  test('Likes are defaulted to 0 when blog has no value for likes', async () => {
    const blogToAdd = {
      title: "Blog with no likes",
      author: 'Pls Like',
      url: 'www.likepls.com'
    }

    await api
      .post('/api/blogs')
      .send(blogToAdd)
      .expect(201)
      .expect(response => {
        // Lisätyn blogin tykkäykset = 0
        expect(response.body.likes).toBe(0)
      })
  })
})

// Blogin poistoon liittyvät testit
describe.only('Removing blogs from database', () => {
  test('Deleting blogs with valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToRemove = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToRemove.id}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    // Tietokannan blogien määrä vähenee yhdellä
    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)
    // Poistettua blogia ei löydy tietokannasta
    expect(blogsAtEnd).not.toContain(blogToRemove)
  })

  test('Statuscode 404 with valid non-existing id', async () => {
    const id = await helper.validNonExistingId()

    await api
      .delete(`/api/blogs/${id}`)
      .expect(404)
  })

  test('Statuscode 400 with invalid id', async () => {
    const id = helper.invalidId

    await api
      .delete(`/api/blogs/${id}`)
      .expect(400)
  })
})

afterAll(() => {
  // Suljetaan tietokantayhteys testien jälkeen
  mongoose.connection.close()
})
