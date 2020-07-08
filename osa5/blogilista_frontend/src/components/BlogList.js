import React from 'react'

const Blog = ({ blog }) => (
  <div>
    {blog.title} - {blog.author}
  </div>
)

const BlogList = ({ blogs }) => (
  <div className='blogList'>
    <h4>Blogs</h4>

    {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
    )}
  </div>
  
)

export default BlogList
