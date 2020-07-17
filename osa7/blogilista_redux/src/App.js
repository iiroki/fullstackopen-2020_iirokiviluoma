import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import './App.css'

import BlogList from './components/BlogList'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'
import LoggedUserInfo from './components/LoggedUserInfo'
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

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [dispatch])  // Activated after 1. render

  // Check if there is active login token
  useEffect(() => {
    dispatch(checkLogin())
  }, [dispatch])

  // Login page shown when there's no user logged in
  const loginPage = () => (
    <LoginForm />
  )

  // Page shown to user who's logged in
  const MainPage = () => (
    <div>
      <LoggedUserInfo />

      <Togglable buttonLabel='New blog' ref={newBlogFormRef}>
        <NewBlogForm
          handleHide={() => newBlogFormRef.current.toggleVisibility()}
        />
      </Togglable>

      <BlogList currentUser={loggedUser.username} />
    </div>
  )

  const userPage = () => (
    <div>
      <LoggedUserInfo />
      <UserList />
    </div>
  )

  return (
    <div>
      <h1>Bloglist</h1>

      <Notification />

      <Switch>
        <Route path={'/users'}>
          {loggedUser === null
            ? loginPage()
            : userPage()
          }
        </Route>

        <Route path={'/'}>
          {loggedUser === null
            ? loginPage()
            : MainPage()
          }
        </Route>
      </Switch>

      
    </div>
  )
}

export default App