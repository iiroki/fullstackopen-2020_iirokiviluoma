import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification, notificationTypes } from '../reducers/notificationReducer'

/*// Yksinkertaistettu bloginäkymä
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
}*/

const Blog = ({ id }) => {
  const blog = useSelector(state => state.blogs)
    .find(b => b.id === id)
  
  const currentUser = useSelector(state => state.login.username)
  const dispatch = useDispatch()
  const history = useHistory()

  if (!blog) return null

  // Muutetaan blogin data oikeaan muotoon tykkäyksen lisäystä varten
  const handleLikeBlog = (blogToLike) => {
    dispatch(likeBlog(blogToLike.id, {
      author: blogToLike.author,
      likes: blogToLike.likes + 1,
      title: blogToLike.title,
      url: blogToLike.url,
      user: blogToLike.user.id
    }))

    dispatch(setNotification(`Like given to: ${blogToLike.title}`,
    notificationTypes.GOOD))
  }

  // Muutetaan blogin data oikeaan muotoon poistoa varten
  const handleDeleteBlog = (blogToDelete) => {
    const confirmationMsg = `Are you sure you want to delete blog: ` +
    `${blogToDelete.title} by ${blogToDelete.author} with ${blogToDelete.likes} ` +
    `likes?`

    // Varmistusikkuna poistolle
    if (!window.confirm(confirmationMsg)) {
      return
    }

    dispatch(deleteBlog(blogToDelete.id))
    dispatch(setNotification(`Removed: ${blogToDelete.title}`,
    notificationTypes.GOOD))
    history.push('/')
  }

  return (
    <div className='blog'>
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
        onClick={() => handleLikeBlog(blog)}>
          Like
      </button><br/>

      <span id='addedBy'>
        Added by: {blog.user.name}
      </span><br/>

      {currentUser === blog.user.username
        ?
        <button id='removeButton' onClick={() => handleDeleteBlog(blog)}>
          Remove
        </button>
        : null}
    </div>
  )
}

export default Blog
