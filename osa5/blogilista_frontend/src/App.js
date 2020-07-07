import React, { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LoggedUserInfo from './components/LoggedUserInfo'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      console.log('Invalid username/password')
    }
  }

  // Tapahtumankäsittelijä uloskirjautumiselle
  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleUsernameChange = (target) => {
    setUsername(target.value)
  }

  const handlePasswordChange = (target) => {
    setPassword(target.value)
  }

  // Sivu, joka näytetään kirjautumattomalle käyttäjälle.
  const loginPage = () => {
    return (
      <LoginForm
        handleLogin={handleLogin}
        username={username} handleUsernameChange={handleUsernameChange}
        password={password} handlePasswordChange={handlePasswordChange}
      />
    )
  }

  // Sivu, joka näytetään kirjautuneelle käyttäjälle.
  const loggedInPage = () => {
    return (
      <div>
        <LoggedUserInfo name={user.name} handleLogout={handleLogout} />

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
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