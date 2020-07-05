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

const blogToAdd = {
  title: 'Testilisäys',
  author: 'Teppo Testaaja',
  url: 'www.testiblogix.com'
}

// Kaikki tietokannan blogit JSON-muodossa
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const validNonExistingId = async () => {
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

module.exports = {
  initialBlogs,
  blogToAdd,
  blogsInDb,
  validNonExistingId
}
