import blogService from '../services/blogs'

const blogsAtStart = []

const blogReducer = (state = blogsAtStart, action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data

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

export default blogReducer
