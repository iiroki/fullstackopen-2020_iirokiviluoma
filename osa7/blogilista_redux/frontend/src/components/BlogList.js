import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const BlogTableItem = ({ blog }) => (
  <tr>
    <td>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      <i style={{marginLeft: '15px'}}>(Likes: {blog.likes})</i>
    </td>
  </tr>
)

const BlogList = () => {    
  const blogs = useSelector(state => state.blogs
    .sort((a, b) => b.likes - a.likes))

  return (
    <div>
      <h3>Blogs</h3>

      <table className='table table-striped'>
        <thead><tr><th>Click on a blog to see more information.</th></tr></thead>
        <tbody>
          {blogs.map(blog =>
            <BlogTableItem key={blog.id} blog={blog} />
          )}
        </tbody>
      </table>

    </div>
  )
}

BlogList.propTypes = {
  currentUser: PropTypes.string.isRequired
}

export default BlogList
