import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'

const reducers = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer
})

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
