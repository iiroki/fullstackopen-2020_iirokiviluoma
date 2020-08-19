import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data && result.data.login) {
      props.setLogin(true)
      props.setToken(result.data.login.value)
    } else {
      console.log('Login failed')
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  const handleSubmit = async event => {
    event.preventDefault()
    
    try {
      await login({ variables: {
          username,
          password: 'pw'
        }}
      )

      setUsername('')
      setPassword('')
      props.setPage('authors')
    } catch (error) {
      console.log(error)
    }
    
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        username
        <input value={username} onChange={({ target }) => setUsername(target.value)} />
        <br/>
        password
        <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
        <br/>
        <button type='submit'>
          login
        </button>
      </form>
    </div>
  )
}

export default Login
