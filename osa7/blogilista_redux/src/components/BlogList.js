import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import Blog from './Blog'

import { setNotification } from '../reducers/notificationReducer'

const BlogList = ({ currentUser, handleLike, handleDelete }) => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  // Muutetaan blogin data oikeaan muotoon tykkäyksen lisäystä varten
  const createBlogLike = (likedBlog) => {
    handleLike({
      user: likedBlog.user.id,
      likes: likedBlog.likes + 1,
      title: likedBlog.title,
      author: likedBlog.author,
      url: likedBlog.url
    }, likedBlog.id)

    dispatch(setNotification(`Like given to: ${likedBlog.title}`))
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

      <i>Click the arrow next to a blog to see more information.</i>

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
  currentUser: PropTypes.string.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default BlogList
