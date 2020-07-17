import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import loginReducer from './reducers/loginReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'

const reducers = combineReducers({
  login: loginReducer,
  blogs: blogReducer,
  users: userReducer,
  notification: notificationReducer
})

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
