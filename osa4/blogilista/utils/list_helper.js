var collection = require('lodash/collection')

const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (total, blog) => total + blog.likes
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 0

  const reducer = (prev, cur) => cur.likes > prev.likes ? cur : prev
  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 0

  // Lasketaan kaikkien bloggaajien blogit
  const test = collection.countBy(blogs, 'author')
  // Etsitään kenellä oli eniten blogeja
  const reducer = (prev, cur) => test[cur] > test[prev] ? cur : prev
  const key = Object.keys(test).reduce(reducer)

  // Muotoillaan vastais nätisti
  return {
      author: key,
      blogs: test[key]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
