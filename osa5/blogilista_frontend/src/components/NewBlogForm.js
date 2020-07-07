import React from 'react'

const NewBlogForm = (props) => (
  <div>
    <h3>New blog</h3>
    <form onSubmit={props.handleAddNewBlog}>
      <table>
        <tbody>

          <tr>
            <td>Title: </td>
            <td>
              <input
                type='text'
                value={props.title}
                name='Title'
                onChange={({ target }) => props.handleNewBlogTitleChange(target)}
              />
            </td>
          </tr>
          
          <tr>
            <td>Author: </td>
            <td>
              <input
                type='text'
                value={props.author}
                name='Author'
                onChange={({ target }) => props.handleNewBlogAuthorChange(target)}
              />
            </td>
          </tr>

          <tr>
            <td>URL: </td>
            <td>
              <input
                type='text'
                value={props.url}
                name='Url'
                onChange={({ target }) => props.handleNewBlogUrlChange(target)}
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
export default NewBlogForm
