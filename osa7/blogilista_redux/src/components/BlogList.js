import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import Blog from './Blog'

import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = ({ currentUser }) => {
  const blogs = useSelector(state => state.blogs
    .sort((a, b) => b.likes - a.likes))
    
  const dispatch = useDispatch()

  // Muutetaan blogin data oikeaan muotoon tykkäyksen lisäystä varten
  const handleLikeBlog = (blogToLike) => {
    dispatch(likeBlog(blogToLike.id, {
      author: blogToLike.author,
      likes: blogToLike.likes + 1,
      title: blogToLike.title,
      url: blogToLike.url,
      user: blogToLike.user.id
    }))

    /*console.log(blogToLike.id, {
      author: blogToLike.author,
      likes: blogToLike.likes + 1,
      title: blogToLike.title,
      url: blogToLike.url,
      user: blogToLike.user.id
    })*/

    dispatch(setNotification(`Like given to: ${blogToLike.title}`))
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
    dispatch(setNotification(`Removed: ${blogToDelete.title}`))
  }

  return (
    <div className='blogList'>
      <h3>Blogs</h3>

      <i>Click the arrow next to a blog to see more information.</i>

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          currentUser={currentUser}
          handleLike={handleLikeBlog}
          handleDelete={handleDeleteBlog}
        />
      )}
    </div>
  )
}

BlogList.propTypes = {
  currentUser: PropTypes.string.isRequired
}

export default BlogList
