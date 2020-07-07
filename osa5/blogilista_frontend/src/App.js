import React, { useState, useEffect } from 'react'
import './App.css'
import BlogList from './components/Blog'
import LoginForm from './components/LoginForm'
import LoggedUserInfo from './components/LoggedUserInfo'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

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
    }
    catch (exception) {
      // TBD: Ilmoitukset!
      console.log('Invalid username/password')
    }
  }

  // Tapahtumankäsittelijä uloskirjautumiselle
  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
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
    }
    catch (exception) {
      console.log('New blog failed.')
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

      {user === null
        ? loginPage()
        : loggedInPage()
      }
    </div>
  )
}

export default App