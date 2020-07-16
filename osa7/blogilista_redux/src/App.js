import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import LoggedUserInfo from './components/LoggedUserInfo'
import NewBlogForm from './components/NewBlogForm'
import { Notification, notificationTypes } from './components/Notification'
import Togglable from './components/Togglable'

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [notificationType, setNotificationType] = useState(notificationTypes.NONE)

  const NOTIFICATIONTIME = 5000  // ms
  const newBlogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogs = await blogService.getAll()

        // Järjestetään blogit laskevaan tykkäysjärjestykseen
        const sortedBlogs = [...blogs].sort((a, b) => {
          if (a.likes < b.likes) return 1
          if (a.likes > b.likes) return -1
          return 0
        })

        setBlogs(sortedBlogs)
      }
      catch (exception) {
        console.log(exception)
      }
    }

    getBlogs()
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

  // Tapahtumankäsittelijä uuden blogin lisäämiselle
  const handleAddNewBlog = async (blogObject) => {
    try {
      const blogToAdd = await blogService.addNew(blogObject)
      // Lomake pois näkyvistä onnistuneen lisäämisen jälkeen
      newBlogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(blogToAdd))

      dispatch(setNotification(`A new blog added: ${blogToAdd.title} - ${blogToAdd.author}`))

      return true
    }
    catch (exception) {
      console.log(exception)
      return false
    }
  }

  // Tapahtumankäsittelijä blogista tykkäämiselle
  const handleBlogLike = async (blogObject, id) => {
    try {
      const likedBlog = await blogService.addLike(id, blogObject)
      setBlogs(blogs.map(b => b.id === id ? likedBlog : b))
    }
    catch (exception) {
      console.log(exception)
    }
  }

  // Tapahtumankäsittelijä blogin poistamiselle
  const handleDeleteBlog = async (blogObject, id) => {
    const confirmationMsg = `Are you sure you want to delete blog ` +
    `${blogObject.title} by ${blogObject.author} with ${blogObject.likes} ` +
    `likes?`

    // Varmistusikkuna poistolle
    if (!window.confirm(confirmationMsg)) {
      return
    }

    try {
      await blogService.deleteBlog(id)
      dispatch(setNotification(`Blog ${blogObject.title} deleted`))
      
    }
    catch (exception) {
      console.log(exception)
    }

    setBlogs(blogs.filter(b => b.id !== id))
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

      <BlogList
        blogs={blogs}
        currentUser={user.username}
        handleLike={handleBlogLike}
        handleDelete={handleDeleteBlog}
      />
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