import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification, notificationTypes } from '../reducers/notificationReducer'

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
      <h3><b><i>{blog.title}</i></b></h3>

      <span id='likes'>
        {'Likes: '}
        <span id='likesAmount'>
          <i>{blog.likes}</i>
        </span>
      </span>

      <button
        className='btn btn-outline-primary'
        onClick={() => handleLikeBlog(blog)}>
          Like
      </button><br/>

      <span id='author'>
        Author: {blog.author}
      </span><br/>

      <span id='url'>
        URL: <a href={`https://${blog.url}`}>{blog.url}</a>
      </span><br/>

      <span id='addedBy'>
        Added by: {blog.user.name}
      </span><br/>

      {currentUser === blog.user.username
        ?
        <button className='btn btn-outline-primary' id='removeButton' onClick={() => handleDeleteBlog(blog)}>
          Remove
        </button>
        : null}
      
      <div>
        Comments
      
        <ul>
          {blog.comments.map(c =>
            <li key={c}>{c}</li>)}
        </ul>

      </div>
    </div>
  )
}

export default Blog
