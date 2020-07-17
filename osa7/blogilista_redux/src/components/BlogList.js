import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const BlogList = () => {    
  const blogs = useSelector(state => state.blogs
    .sort((a, b) => b.likes - a.likes))

  return (
    <div className='blogList'>
      <h3>Blogs</h3>

      <i>Click the arrow next to a blog to see more information.</i>

      {blogs.map(blog =>
        <div className='blog' key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </div>
      )}
    </div>
  )
}

BlogList.propTypes = {
  currentUser: PropTypes.string.isRequired
}

export default BlogList
