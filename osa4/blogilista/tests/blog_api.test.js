const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

// Kääritään app "superagent"-olioksi
const api = supertest(app)

const initializeUsers = async () => {
  await User.deleteMany({})
    
  // Lisätään käyttäjät tietokantaan
  for (let user of helper.initialUsers) {
    await api.post('/api/users').send(user)
  }
}

const initializeBlogs = async () => {
  await Blog.deleteMany({})
  let loginTokens = []

  // Haetaan käyttäjien login-tokenit
  for (let user of helper.initialUsers) {
    loginTokens = loginTokens.concat(await getTokenAuth(user))
  }
  let userIndex = 0

  // Lisätään blogit tietokantaan tokenien avulla.
  for (let blog of helper.initialBlogs) {
    const auth = loginTokens[userIndex]
    
    await api
      .post('/api/blogs')
      .set('Authorization', auth)
      .send(blog)
    
    userIndex = userIndex === 0
      ? 1
      : 0
  }
}

const getTokenAuth = async (user) => {
  const logInData = {
    username: user.username,
    password: user.password
  }

  const response = await api.post('/api/login').send(logInData)
  return 'BEARER ' + response.body.token
}

describe.skip('User tests', () => {
  // Alustetaan käyttäjien testitietokanta ennen testejä
  beforeEach(async () => {
    await initializeUsers()
  })

  describe('Fetching all users from database', () => {
    test('All users are returned', async () => {
      const response = await api.get('/api/users')
      expect(response.body.length).toBe(helper.initialUsers.length)
    })
  })

  describe('Addings users to database', () => {
    test('Succeeds with valid data', async () => {
      const userToAdd = {
        username: 'testusertoadd',
        password: 'badpassword',
        name: 'Test User-To-Add'
      }

      await api
        .post('/api/users')
        .send(userToAdd)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    })

    test('Fails with 400 + msg when creating user with too short username', async () => {
      const userToAdd = {
        username: 'ab',
        password: 'asdfgh',
        name: 'Short Username'
      }

      await api
        .post('/api/users')
        .send(userToAdd)
        .expect(400)
        .expect(response => {
          expect(response.body).toBeDefined()
        })
    })

    test('Fails with 400 + msg when creating user with too short password', async () => {
      const userToAdd = {
        username: 'username',
        password: 'as',
        name: 'Short Password'
      }

      await api
        .post('/api/users')
        .send(userToAdd)
        .expect(400)
        .expect(response => {
          expect(response.body).toBeDefined()
        })
    })
    
    test('Fails with 400 + msg when creating user with already existing username', async () => {
      const userToAdd = {
        username: 'fortesting',
        password: 'test123',
        name: 'Non Unique'
      }

      await api
        .post('/api/users')
        .send(userToAdd)
        .expect(400)
        .expect(response => {
          expect(response.body).toBeDefined()
        })
    })
  })

  describe('Logins', () => {
    test('Succeeds with correct username and password', async () => {
      const userToLogIn = helper.initialUsers[0]

      const logInData = {
        username: userToLogIn.username,
        password: userToLogIn.password
      }

      await api
        .post('/api/login')
        .send(logInData)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect(response => {
          expect(response.body.token).toBeDefined()
          expect(response.body.username).toBeDefined()
          expect(response.body.name).toBeDefined()
        })
    })

    test('Fails with 401 when non-existing username', async () => {
      const userToLogIn = helper.initialUsers[0]

      const logInData = {
        username: userToLogIn.username,
        password: 'wrongpassword'
      }

      await api
        .post('/api/login')
        .send(logInData)
        .expect(401)
    })

    test('Fails with 401 when wrong password', async () => {
      const userToLogIn = helper.initialUsers[0]

      const logInData = {
        username: 'wrongusername',
        password: userToLogIn.password
      }

      await api
        .post('/api/login')
        .send(logInData)
        .expect(401)
    })
  })
})


describe.only('Blog tests', () => {
  // Alustetaan blogien testitietokanta ennen jokaista testiä
  beforeEach(async () => {
    await initializeUsers()
    await initializeBlogs()
  })

  // Blogien hakemiseen liittyvät testit
  describe('Fetching all blogs from database', () => {
    test('All blogs are returned', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('Blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
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
      blog.user = blog.user.toString()  //ObjectId -> String

      const result = await api
        .get(`/api/blogs/${blog.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(result.body).toEqual(blog)
    })

    test('Fails with 404 when provided valid non-existing id', async () => {
      const id = await helper.validNonExistingBlogId()

      const result = await api
        .get(`/api/blogs/${id}`)
        .expect(404)
    })

    test('Fails with 400 when provided invalid id', async () => {
      const id = helper.invalidId

      const result = await api
      .get(`/api/blogs/${id}`)
      .expect(400)
    })
  })

  // Blogin lisäämiseen liittyvät testit
  describe('Adding blog to database', () => {
    test('Succeeds with valid data', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToAdd = {
        title: 'Testilisäys',
        author: 'Teppo Testaaja',
        url: 'www.testiblogix.com',
        likes: 5
      }

      const auth = await getTokenAuth(helper.initialUsers[0])

      await api
        .post('/api/blogs')
        .set('Authorization', auth)
        .send(blogToAdd)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map(blog => blog.title)
      expect(blogsAtStart.length + 1).toBe(blogsAtEnd.length)
      expect(titles).toContain(blogToAdd.title)
    })

    test('Fails with 401 when invalid token', async () => {
      const blogToAdd = {
        title: 'Testilisäys',
        author: 'Teppo Testaaja',
        url: 'www.testiblogix.com',
        likes: 5
      }

      const auth = helper.invalidId

      await api
        .post('/api/blogs')
        .set('Authorization', auth)
        .send(blogToAdd)
        .expect(401)
    })

    test('Fails with 400 when provided invalid data', async () => {
      const blogToAdd = {
        // Ei titleä
        author: 'Blog',
        // Ei urlia
        likes: 10
      }

      const auth = await getTokenAuth(helper.initialUsers[0])

      await api
        .post('/api/blogs')
        .set('Authorization', auth)
        .send(blogToAdd)
        .expect(400)
    })

    test('Likes are defaulted to 0 when blog has no value for likes', async () => {
      const blogToAdd = {
        title: "Blog with no likes",
        author: 'Pls Like',
        url: 'www.likepls.com'
        // Ei tykkäyksiä
      }

      const auth = await getTokenAuth(helper.initialUsers[0])

      await api
        .post('/api/blogs')
        .set('Authorization', auth)
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
    test.only('Deleting blog with valid id and token', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToRemove = blogsAtStart[0]
      const auth = await getTokenAuth(helper.initialUsers[0])

      await api
        .delete(`/api/blogs/${blogToRemove.id}`)
        .set('Authorization', auth)
        .expect(204)
      
      const blogsAtEnd = await helper.blogsInDb()
      // Blogien määrä vähentynyt + poistettavaa blogia ei löydy
      expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)
      expect(blogsAtEnd).not.toContain(blogToRemove)
    })

    test('Fails with 404 with valid non-existing id', async () => {
      const id = await helper.validNonExistingBlogId()

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

  describe.skip('Modifying blogs in database', () => {
    test('Modifying blog with valid id', async () => {
      const [blogToUpdate, blogNotUpdated] = await helper.blogUpdatedLikes()

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      // Päivitetty blogi löytyy tietokannasta
      expect(blogsAtEnd).toContainEqual(blogToUpdate)
      // Päivittämätön blogi ei enää löydy tietokannasta
      expect(blogsAtEnd).not.toContainEqual(blogNotUpdated)
    })

    test('Fails with 404 when provided valid non-existing id', async () => {
      const id = await helper.validNonExistingBlogId()
      const [blogToUpdate] = await helper.blogUpdatedLikes()

      await api
      .put(`/api/blogs/${id}`)
      .send(blogToUpdate)
      .expect(404)
    })

    test('Fails with 400 when provided invalid id', async () => {
      const id = helper.invalidId
      const [blogToUpdate] = await helper.blogUpdatedLikes()

      await api
      .put(`/api/blogs/${id}`)
      .send(blogToUpdate)
      .expect(400)
    })

    test('Fails with 400 when invalid data to update with', async () => {
      const [blogToUpdate] = await helper.blogUpdatedLikes()
      // Poistetaan title ja url
      delete blogToUpdate.title
      delete blogToUpdate.url

      await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(400)
    })
  })
})

afterAll(() => {
  // Suljetaan tietokantayhteys testien jälkeen
  mongoose.connection.close()
})
