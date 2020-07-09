import React, { useState } from 'react'

// Yksinkertaistettu bloginäkymä
const BlogView = ({ blog, handleFullView }) => (
  <div className='blog'>
    <div className='blogHeader' onClick={handleFullView}>
      &#x25BF; {blog.title} - {blog.author}
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
    <div className='blogHeader' onClick={handleFullView}>
      &#x25B5; <b><u>{blog.title}</u></b>
    </div>
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

export default Blog
