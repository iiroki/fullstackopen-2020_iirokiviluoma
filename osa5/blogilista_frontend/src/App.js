import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import LoggedUserInfo from './components/LoggedUserInfo'
import NewBlogForm from './components/NewBlogForm'
import {Notification, notificationTypes} from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [notificationType, setNotificationType] = useState(notificationTypes.NONE)

  const NOTIFICATIONTIME = 5000  // ms
  const newBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])  // Aktivoidaan 1. renderöinnin jälkeen

  // Tarkastetaan selaimen muistista kirjautumistiedot
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')

    if (loggedUserJson) {
      const loggedUser = JSON.parse(loggedUserJson)
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
    }
  }, [])

  const showNotification = (msg, type) => {
    setNotificationType(type)
    setNotificationMsg(msg)

    setTimeout(() => {
      setNotificationType(notificationTypes.NONE)
      setNotificationMsg(null)
    }, NOTIFICATIONTIME)
  }

  // Tapahtumankäsittelijä sisäänkirjautumiselle
  const handleLogin = async (loginObject) => {
    try {
      const userToLogIn = await loginService.login(loginObject)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(userToLogIn)
      )

      blogService.setToken(userToLogIn.token)
      setUser(userToLogIn)

      showNotification(
        'Login successful',
        notificationTypes.GOOD
      )
    }
    catch (exception) {
      showNotification(
        'Invalid username or password',
        notificationTypes.ERROR
      )
    }
  }

  // Tapahtumankäsittelijä uloskirjautumiselle
  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)

    showNotification(
      'Logout successful',
      notificationTypes.GOOD
    )
  }

  // Tapahtumankäsittelijä uuden blogin lisäämiselle
  const handleAddNewBlog = async (blogObject) => {
    try {
      const blogToAdd = await blogService.addNew(blogObject)
      // Lomake pois näkyvistä onnistuneen lisäämisen jälkeen
      newBlogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(blogToAdd))

      showNotification(
        `A new blog added: ${blogToAdd.title} - ${blogToAdd.author}`,
        notificationTypes.GOOD
      )
      
      return true
    }
    catch (exception) {
      showNotification(
        'Invalid data',
        notificationTypes.ERROR
      )

      return false
    }
  }

  // Tapahtumankäsittelijä blogista tykkäämiselle
  const handleBlogLike = async (blogObject, id) => {
    const likedBlog = await blogService.addLike(id, blogObject)
    setBlogs(blogs.map(b => b.id === id ? likedBlog : b))
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
        <NewBlogForm handleAddNewBlog={handleAddNewBlog} />
      </Togglable>

      <BlogList blogs={blogs} handleLike={handleBlogLike} />
    </div>
)
  

  return (
    <div>
      <h1>Bloglist</h1>

      <Notification msg={notificationMsg} type={notificationType} />

      {user === null
        ? loginPage()
        : loggedInPage()
      }
    </div>
  )
}

export default App