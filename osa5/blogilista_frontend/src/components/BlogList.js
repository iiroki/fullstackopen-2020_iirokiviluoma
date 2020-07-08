import React, { useState } from 'react'

const BlogView = ({ blog, handleFullView }) => (
  <div className='blog'>
      {blog.title} - {blog.author} 
      <button className='button' onClick={handleFullView}>View</button>
    </div>
)

const BlogFullView = ({ blog, handleFullView }) => (
  <div className='blog'>
    <b>{blog.title}</b>
    <button className='button' onClick={handleFullView}>Hide</button><br/>
    Author: {blog.author}<br/>
    Likes: {blog.likes}
    <button className='button'>Like</button><br/>
    Added by: {blog.user.name}<br/>
  </div>
)

const Blog = ({ blog }) => {
  const [fullView, setFullView] = useState(false)

  const toggleFullView = () => {
    setFullView(!fullView)
  }

  // Näytetään blogin tiedot fullView-muuttujan mukaan
  return (
    fullView === true
      ? <BlogFullView blog={blog} handleFullView={toggleFullView}/>
      : <BlogView blog={blog} handleFullView={toggleFullView} />
  )
}

const BlogList = ({ blogs }) => (
  <div className='blogList'>
    <h4>Blogs</h4>

    {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
    )}
  </div>
  
)

export default BlogList
