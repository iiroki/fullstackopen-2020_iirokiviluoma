import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import NavigationMenu from './components/NavigationMenu'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import User from './components/User'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { checkLogin } from './reducers/loginReducer'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'

const App = () => {
  const loggedUser = useSelector(state => state.login)
  const dispatch = useDispatch()
  const newBlogFormRef = useRef()

  // Initializing blogs and users
  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [dispatch])  // Activated after 1. render

  // Check if there is active login token
  useEffect(() => {
    dispatch(checkLogin())
  }, [dispatch])

  // Main page shown to user who's logged in
  const MainPage = () => (
    <div>
      <Togglable buttonLabel='New blog' ref={newBlogFormRef}>
        <NewBlogForm
          handleHide={() => newBlogFormRef.current.toggleVisibility()}
        />
      </Togglable>

      <BlogList currentUser={loggedUser.username} />
    </div>
  )

  const usersPage = () => (
    <div>
      <UserList />
    </div>
  )

  const blogPage = (blogId) => (
    <div>
      <Blog id={blogId} />
    </div>
  )

  const userPage = (userId) => (
    <div>
      <User id={userId} />
    </div>
  )

  const blogMatch = useRouteMatch('/blogs/:id')
  
  const blogId = blogMatch
    ? blogMatch.params.id
    : null

  const userMatch = useRouteMatch('/users/:id')
  
  const userId = userMatch
    ? userMatch.params.id
    : null
  
  return (
    <div className='container'>
      <h1><b>Bloglist</b></h1>

      <NavigationMenu />

      <Notification />

      <Switch>
        <Route path={'/blogs/:id'}>
          {loggedUser === null
            ? <LoginForm />
            : blogPage(blogId)
          }
        </Route>

        <Route path={'/users/:id'}>
          {loggedUser === null
            ? <LoginForm />
            : userPage(userId)
          }
        </Route>

        <Route path={'/users'}>
          {loggedUser === null
            ? <LoginForm />
            : usersPage()
          }
        </Route>

        <Route path={'/'}>
          {loggedUser === null
            ? <LoginForm />
            : MainPage()
          }
        </Route>
      </Switch>

      
    </div>
  )
}

export default App