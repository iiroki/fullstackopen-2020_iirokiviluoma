import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Yksinkertaistettu bloginäkymä
const BlogView = ({ blog, handleFullView }) => (
  <div className='blog'>
    <div className='blogHeader' onClick={handleFullView}>
      {blog.title} - {blog.author}
    </div>
  </div>
)

// Bloginäkymä kaikilla blogin tiedoilla
const BlogFullView = ({
  blog,
  currentUser,
  handleFullView,
  handleLike,
  handleDelete
}) => (
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

    {currentUser === blog.user.username
      ? <button onClick={() => handleDelete(blog)}>Remove</button>
      : null}
  </div>
)

const Blog = ({ blog, currentUser, handleLike, handleDelete }) => {
  const [fullView, setFullView] = useState(false)

  const toggleFullView = () => {
    setFullView(!fullView)
  }

  // Näytetään blogin tiedot fullView-muuttujan mukaan
  return (
    fullView === true
      ?
      <BlogFullView
        blog={blog}
        currentUser={currentUser}
        handleFullView={toggleFullView}
        handleLike={handleLike}
        handleDelete={handleDelete}
      />
      : <BlogView blog={blog} handleFullView={toggleFullView} />
  )
}

const BlogList = ({ blogs, currentUser, handleLike, handleDelete }) => {
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

  // Muutetaan blogin data oikeaan muotoon poistoa varten
  const createBlogDeletion = (blogToDelete) => {
    handleDelete({
      title: blogToDelete.title,
      author: blogToDelete.author,
      likes: blogToDelete.likes
    }, blogToDelete.id)
  }

  return (
    <div className='blogList'>
      <h3>Blogs</h3>

      <i>Click on a blog to see more information.</i>

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          currentUser={currentUser}
          handleLike={createBlogLike}
          handleDelete={createBlogDeletion}
        />
      )}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  currentUser: PropTypes.string.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default BlogList
