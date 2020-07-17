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

import { useDispatch } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [user, setUser] = useState(null)

  const newBlogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])  // Activated after 1. render

  // Tarkastetaan selaimen muistista kirjautumistiedot
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')

    if (loggedUserJson) {
      const loggedUser = JSON.parse(loggedUserJson)
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
    }
  }, [])

  // Tapahtumankäsittelijä sisäänkirjautumiselle
  const handleLogin = async (loginObject) => {
    try {
      const userToLogIn = await loginService.login(loginObject)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(userToLogIn)
      )

      blogService.setToken(userToLogIn.token)
      setUser(userToLogIn)

      dispatch(setNotification('Login successful'))
    }
    catch (exception) {
      console.log(exception)
    }
  }

  // Tapahtumankäsittelijä uloskirjautumiselle
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)

    dispatch(setNotification('Logout successful'))
  }

  // Kirjautumattomalle käyttäjälle näytettävä sivu
  const loginPage = () => (
    <LoginForm handleLogin={handleLogin} />
  )

  // Kirjautuneelle käyttäjälle näytettävä sivu
  const loggedInPage = () => (
    <div>
      <LoggedUserInfo name={user.name} handleLogout={handleLogout} />

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