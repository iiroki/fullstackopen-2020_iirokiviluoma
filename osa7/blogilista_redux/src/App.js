import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import LoggedUserInfo from './components/LoggedUserInfo'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { useSelector, useDispatch } from 'react-redux'
import { checkLogin } from './reducers/userReducer'
import { initBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const user = useSelector(state => state.user)

  const newBlogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])  // Activated after 1. render

  // Check if there is active login token
  useEffect(() => {
    dispatch(checkLogin())
  }, [dispatch])

  // Kirjautumattomalle käyttäjälle näytettävä sivu
  const loginPage = () => (
    <LoginForm />
  )

  // Kirjautuneelle käyttäjälle näytettävä sivu
  const loggedInPage = () => (
    <div>
      <LoggedUserInfo />

      <Togglable buttonLabel='New blog' ref={newBlogFormRef}>
        <NewBlogForm
          handleHide={() => newBlogFormRef.current.toggleVisibility()}
        />
      </Togglable>

      <BlogList currentUser={user.username} />
    </div>
  )

  return (
    <div>
      <h1>Bloglist</h1>

      <Notification />

      {user === null
        ? loginPage()
        : loggedInPage()
      }
    </div>
  )
}

export default App