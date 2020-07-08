import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ handleAddNewBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  // Tila asetetaan oletustilaan uuden renderöinnin yhteydessä!
  const resetNewBlogFields = () => {
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  const createNewBlog = async (event) => {
    event.preventDefault()

    const success = await handleAddNewBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })

    if (success) resetNewBlogFields()
  }

  return (
    <div>
      <h3>New blog</h3>
      <form onSubmit={createNewBlog}>
        <table>
          <tbody>

            <tr>
              <td>Title: </td>
              <td>
                <input
                  type='text'
                  value={newBlogTitle}
                  name='Title'
                  onChange={({ target }) => setNewBlogTitle(target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>Author: </td>
              <td>
                <input
                  type='text'
                  value={newBlogAuthor}
                  name='Author'
                  onChange={({ target }) => setNewBlogAuthor(target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>URL: </td>
              <td>
                <input
                  type='text'
                  value={newBlogUrl}
                  name='Url'
                  onChange={({ target }) => setNewBlogUrl(target.value)}
                />
              </td>
            </tr>

            <tr>
              <td colSpan='2'>
                <button type='submit'>Add</button>
              </td>
            </tr>

          </tbody>
        </table>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  handleAddNewBlog: PropTypes.func.isRequired
}

export default NewBlogForm
