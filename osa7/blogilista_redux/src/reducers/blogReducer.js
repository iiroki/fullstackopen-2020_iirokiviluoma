import blogService from '../services/blogs'

const blogsAtStart = []

const blogReducer = (state = blogsAtStart, action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    
    case 'NEW_BLOG':
      return [...state, action.data]
    
    case 'DELETE_BLOG':
      return state.filter(b => b.id !== action.data)
    
    case 'LIKE_BLOG':
      return state.map(b => b.id === action.data.id ? action.data : b)

    default:
      return state
  }
}

export const initBlogs = () => (
  async thunk => {
    try {
      const blogs = await blogService.getAll()

      thunk({
        type: 'INIT_BLOGS',
        data: blogs
      })
    }
    catch (error) {
      console.log(error.message)
    }
  }
)

export const addNewBlog = (blogObject) => (
  async thunk => {
    try {
      const newBlog = await blogService.addNew(blogObject)

      thunk({
        type: 'NEW_BLOG',
        data: newBlog
      })
    }
    catch (error) {
      console.log(error.message)
    }
  }
)

export const deleteBlog = (id) => (
  async thunk => {
    try {
      await blogService.deleteBlog(id)

      thunk({
        type: 'DELETE_BLOG',
        data: id
      })
    }
    catch (error) {
      console.log(error.message)
    }
  }
)

export const likeBlog = (id, blogObject) => (
  async thunk => {
    try {
      const likedBlog = await blogService.modifyExisting(id, blogObject)

      thunk({
        type: 'LIKE_BLOG',
        data: likedBlog
      })
    }
    catch (error) {
      console.log(error.message)
    }
  }
)

export default blogReducer
