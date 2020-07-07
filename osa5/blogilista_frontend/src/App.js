import React, { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
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

  const resetLoginFields = () => {
    setUsername('')
    setPassword('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const userToLogIn = await loginService.login({
        username,
        password
      })

      resetLoginFields()
      setUser(userToLogIn)
    }
    catch (exception) {
      console.log('Invalid username/password')
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const loginPage = () => {
    return (
      <LoginForm
        handleLogin={handleLogin}
        username={username} handleUsernameChange={handleUsernameChange}
        password={password} handlePasswordChange={handlePasswordChange}
      />
    )
  }

  const loggedInPage = () => {
    return (
      <div>
        <h4>Logged in as {user.name}</h4>

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