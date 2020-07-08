import React, { useState } from 'react'

// Yksinkertaistettu bloginäkymä
const BlogView = ({ blog, handleFullView }) => (
  <div className='blog'>
    <div className='blogHeader' onClick={handleFullView}>
      {blog.title} - {blog.author} 
    </div>
  </div>
)

// Bloginäkymä kaikilla blogin tiedoilla
const BlogFullView = ({ blog, handleFullView, handleLike }) => (
  <div className='blog'>
    <b><u>
      <div className='blogHeader' onClick={handleFullView}>
        {blog.title}
      </div>
    </u></b>
    Author: {blog.author}<br/>
    Likes: {blog.likes}
    <button
      className='inlineButton'
      onClick={() => handleLike(blog)}>
        Like
    </button><br/>
    Added by: {blog.user.name}<br/>
  </div>
)

const Blog = ({ blog, handleLike }) => {
  const [fullView, setFullView] = useState(false)

  const toggleFullView = () => {
    setFullView(!fullView)
  }

  // Näytetään blogin tiedot fullView-muuttujan mukaan
  return (
    fullView === true
      ? <BlogFullView
          blog={blog}
          handleFullView={toggleFullView}
          handleLike={handleLike}
        />
      : <BlogView blog={blog} handleFullView={toggleFullView} />
  )
}

const BlogList = ({ blogs, handleLike }) => {
  // Muutetaan blogin data oikeaan muotoon tykkäyksen lisäystä varten
  const createBlogLike = (likedBlog) => {
    handleLike({
      user: likedBlog.user.id,
      likes: likedBlog.likes + 1,
      title: likedBlog.title,
      author: likedBlog.author,
      url: likedBlog.url
    }, likedBlog.id)
  }

  return (
    <div className='blogList'>
      <h3>Blogs</h3>

      <i>Click on a blog to see more information.</i>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={createBlogLike} />
      )}
    </div>
  )
}

export default BlogList
