import React, { useState, useEffect } from 'react'
import './App.css'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/Blog'
import LoginForm from './components/LoginForm'
import LoggedUserInfo from './components/LoggedUserInfo'
import NewBlogForm from './components/NewBlogForm'
import {Notification, notificationTypes} from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [notificationType, setNotificationType] = useState(notificationTypes.NONE)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const NOTIFICATIONTIME = 5000  // ms

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

  const resetLoginFields = () => {
    setUsername('')
    setPassword('')
  }

  const resetNewBlogFields = () => {
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  const showNotification = (msg, type) => {
    setNotificationType(type)
    setNotificationMsg(msg)
    clearTimeout()

    setTimeout(() => {
      setNotificationType(notificationTypes.NONE)
      setNotificationMsg(null)
    }, NOTIFICATIONTIME)
  }

  // Tapahtumankäsittelijä sisäänkirjautumiselle
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const userToLogIn = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(userToLogIn)
      )

      blogService.setToken(userToLogIn.token)
      setUser(userToLogIn)
      resetLoginFields()

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
  const addNewBlog = async (event) => {
    event.preventDefault()

    try {
      const blogToAdd = await blogService.addNew({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      })

      setBlogs(blogs.concat(blogToAdd))
      resetNewBlogFields()

      showNotification(
        `A new blog added: ${blogToAdd.title} - ${blogToAdd.author}`,
        notificationTypes.GOOD
      )
    }
    catch (exception) {
      showNotification(
        'Invalid data',
        notificationTypes.ERROR
      )
    }
  }

  const handleUsernameChange = (target) => {
    setUsername(target.value)
  }

  const handlePasswordChange = (target) => {
    setPassword(target.value)
  }

  const handleNewBlogTitleChange = (target) => {
    setNewBlogTitle(target.value)
  }

  const handleNewBlogAuthorChange = (target) => {
    setNewBlogAuthor(target.value)
  }

  const handleNewBlogUrlChange = (target) => {
    setNewBlogUrl(target.value)
  }

  // Kirjautumattomalle käyttäjälle näytettävä sivu
  const loginPage = () => {
    return (
      <LoginForm
        handleLogin={handleLogin}
        username={username} handleUsernameChange={handleUsernameChange}
        password={password} handlePasswordChange={handlePasswordChange}
      />
    )
  }

  // Kirjautuneelle käyttäjälle näytettävä sivu
  const loggedInPage = () => {
    return (
      <div>
        <LoggedUserInfo name={user.name} handleLogout={handleLogout} />

        <NewBlogForm
          handleAddNewBlog={addNewBlog}
          title={newBlogTitle}
          handleNewBlogTitleChange={handleNewBlogTitleChange}
          author={newBlogAuthor}
          handleNewBlogAuthorChange={handleNewBlogAuthorChange}
          url={newBlogUrl}
          handleNewBlogUrlChange={handleNewBlogUrlChange}
        />

        <BlogList blogs={blogs} />
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification msg={notificationMsg} type={notificationType} />

      {user === null
        ? loginPage()
        : loggedInPage()
      }
    </div>
  )
}

export default App