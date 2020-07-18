import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleComment = (event) => {
    event.preventDefault()

    dispatch(commentBlog(blogId, {
      comment: comment
    }))

    setComment('')
  }

  const margin = {
    margin: '10px 0px'
  }

  const padding = {
    padding: '3px 5px'
  }

  return (
    <div style={margin}>
      <form onSubmit={handleComment}>
        <input
          id='comment'
          type='text'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button
          className='btn btn-outline-primary'
          style={padding}
          type='submit'
        >
          Comment
        </button>
      </form>
    </div>
  )
}

export default CommentForm
