import blogService from '../services/blogs'

const blogsAtStart = []

const blogReducer = (state = blogsAtStart, action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    
    case 'NEW_BLOG':
      return [...state, action.data]

    default:
      return state
  }
}

export const initBlogs = () => (
  async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
)

export const addNewBlog = (blogObject) => (
  async dispatch => {
    try {
      const newBlog = await blogService.addNew(blogObject)

      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
    }
    catch (error) {
      console.log('ERROR:', error)
    }
  }
)

export default blogReducer
