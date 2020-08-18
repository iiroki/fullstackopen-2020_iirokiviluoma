import React, { useState } from 'react'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!props.show) {
    return null
  }

  const handleSubmit = async event => {
    event.preventDefault()
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
