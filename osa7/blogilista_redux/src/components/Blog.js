import React, { useState } from 'react'

// Yksinkertaistettu bloginäkymä
const BlogView = ({ blog, handleFullView }) => (
  <div className='blog'>
    <div className='blogExpand' onClick={handleFullView}>
      &#x25B5;
    </div>
    {blog.title} - {blog.author}
  </div>
)

// Bloginäkymä kaikilla blogin tiedoilla
const BlogFullView = ({
  blog,
  currentUser,
  handleFullView,
  handleLike,
  handleDelete
}) => {
  return (
    <div className='blog'>
      <div className='blogExpand' onClick={handleFullView}>
        &#x25BF;
      </div>
      <span id='title'>
        <b><u>{blog.title}</u></b>
      </span><br/>

      <span id='author'>
        Author: {blog.author}
      </span><br/>

      <span id='url'>
        URL: {blog.url}
      </span><br/>

      <span id='likes'>
        {'Likes: '}
        <span id='likesAmount'>
          <i>{blog.likes}</i>
        </span>
      </span>

      <button
        className='likeButton'
        onClick={() => handleLike(blog)}>
          Like
      </button><br/>

      <span id='addedBy'>
        Added by: {blog.user.name}
      </span><br/>

      {currentUser === blog.user.username
        ?
        <button id='removeButton' onClick={() => handleDelete(blog)}>
          Remove
        </button>
        : null}
    </div>
  )
}

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
