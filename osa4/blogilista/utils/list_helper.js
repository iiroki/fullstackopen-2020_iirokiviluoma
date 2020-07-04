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
  const bloggerBlogs= collection.countBy(blogs, 'author')
  // Etsitään kenellä oli eniten blogeja
  const reducer = (prev, cur) => bloggerBlogs[cur] > bloggerBlogs[prev] ? cur : prev
  const key = Object.keys(bloggerBlogs).reduce(reducer)

  // Muotoillaan vastaus nätisti
  return {
      author: key,
      blogs: bloggerBlogs[key]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return 0

  const bloggerBlogs = collection.groupBy(blogs, 'author')
  var bloggerLikes = []

  collection.forEach(bloggerBlogs, (blogs, blogger) => {
    var likes = 0
    // Summataan kirjoittajan blogien tykkäykset
    blogs.forEach(blog => {
      likes = likes + blog.likes
    })
    // Tallennetaan kirjoittaja ja tykkäykset
    bloggerLikes.push(
      {
        author: blogger,
        likes: likes
      })
  })

  const reducer = (prev, cur) => cur.likes > prev.likes ? cur : prev
  return bloggerLikes.reduce(reducer)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
