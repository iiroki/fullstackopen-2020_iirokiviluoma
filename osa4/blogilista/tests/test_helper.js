const Blog = require('../models/blog')

// Kovakoodatut blogit testejä varten
const initialBlogs = [
  {
    title: 'Testiautomaatio',
    author: 'Teppo Testaaja',
    url: 'www.testiblogi1.com',
    likes: 5
  },
  {
    title: 'Testaajan blogi',
    author: 'Matti Mäkinen',
    url: 'www.testiblogi2.com',
    likes: 2
  },
  {
    title: 'Mä joka päivä testejä teen',
    author: 'Jose Mattila',
    url: 'www.testiblogi3.com',
    likes: 9
  },
  {
    title: 'Kiven kovaa testausta',
    author: 'Timo Testimies',
    url: 'www.testiblogi4.com',
    likes: 1
  },
  {
    title: 'Testing for dummies',
    author: 'Heikki Testihenkilö',
    url: 'www.testiblogi5.com',
    likes: 18
  },
  {
    title: 'Testiblogi',
    author: 'Heikki Testihenkilö',
    url: 'www.testiblogi6.com',
    likes: 12
  }
]

// Kaikki tietokannan blogit JSON-muodossa
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const blogUpdatedLikes = async () => {
  const blogsAtStart = await blogsInDb()
  const blogNotUpdated = blogsAtStart[0]
  // Kopio päivitettävästä blogista
  const blogToUpdate = Object.assign({}, blogNotUpdated)
  blogToUpdate.likes += 1
  return [blogToUpdate, blogNotUpdated]
}

const validNonExistingBlogId = async () => {
  const blog = new Blog({
      author: 'fortesting',
      title: 'fortesting',
      url: 'fortesting'
    }
  )

  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

// Kovakoodatut käyttäjätilit testejä varten
const initialUsers = [
  {
    username: 'fortesting',
    passwordHash: 'testhash',
    name: 'Dumb'
  },
  {
    username: 'testman',
    passwordHash: 'testhash',
    name: 'Tester'
  }
]

const invalidId = '1nv4l1d1d'

module.exports = {
  initialBlogs,
  blogsInDb,
  blogUpdatedLikes,
  validNonExistingBlogId,
  initialUsers,
  invalidId
}
