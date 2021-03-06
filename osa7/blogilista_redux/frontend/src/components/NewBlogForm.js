import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { addNewBlog } from '../reducers/blogReducer'
import { setNotification, notificationTypes } from '../reducers/notificationReducer'

const NewBlogForm = ({ handleHide }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const dispatch = useDispatch()

  const resetFields = () => {
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  const createNewBlog = async (event) => {
    event.preventDefault()

    const success = await dispatch(addNewBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }))
  
    if (success) {
      dispatch(setNotification(`A new blog added: ${newBlogTitle} - ${newBlogAuthor}`,
        notificationTypes.GOOD))

      resetFields()
      handleHide()
    } else {
      dispatch(setNotification(`Incomplete form values`,
        notificationTypes.ERROR))
    }
  }

  return (
    <div className='newBlogForm'>
      <h3>New blog</h3>
      <form onSubmit={createNewBlog}>
        <table style={{textAlign: 'center'}}>
          <tbody>

            <tr>
              <td>Title: </td>
              <td>
                <input
                  id='title'
                  type='text'
                  value={newBlogTitle}
                  onChange={({ target }) => setNewBlogTitle(target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>Author: </td>
              <td>
                <input
                  id='author'
                  type='text'
                  value={newBlogAuthor}
                  onChange={({ target }) => setNewBlogAuthor(target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>URL: </td>
              <td>
                <input
                  id='url'
                  type='text'
                  value={newBlogUrl}
                  onChange={({ target }) => setNewBlogUrl(target.value)}
                />
              </td>
            </tr>

            <tr>
              <td colSpan='2'>
                <button className='btn btn-outline-primary' type='submit'>Add</button>
              </td>
            </tr>

          </tbody>
        </table>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  handleHide: PropTypes.func.isRequired
}

export default NewBlogForm
