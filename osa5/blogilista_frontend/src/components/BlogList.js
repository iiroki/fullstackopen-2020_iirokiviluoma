import React, { useState } from 'react'

const BlogView = ({ blog, handleFullView }) => (
  <div className='blog'>
    <div className='blogHeader' onClick={handleFullView}>
      {blog.title} - {blog.author} 
    </div>
  </div>
)

const BlogFullView = ({ blog, handleFullView }) => (
  <div className='blog'>
    <b><u>
      <div className='blogHeader' onClick={handleFullView}>
        {blog.title}
      </div>
    </u></b>
    Author: {blog.author}<br/>
    Likes: {blog.likes}
    <button className='inlineButton'>Like</button><br/>
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
    <h3>Blogs</h3>

    <i>Click on a blog to see more information.</i>

    {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
    )}
  </div>
  
)

export default BlogList
