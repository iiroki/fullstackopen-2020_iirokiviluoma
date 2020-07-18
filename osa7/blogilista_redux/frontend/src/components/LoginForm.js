import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logIn } from '../reducers/loginReducer'
import { setNotification, notificationTypes } from '../reducers/notificationReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    const success = await dispatch(logIn({
      username: username,
      password: password
    }))

    success
    ? dispatch(setNotification('Login successful', notificationTypes.GOOD))
    : dispatch(setNotification('Invalid login credentials', notificationTypes.ERROR))
  }

  return (
    <div style={{paddingTop: '15px'}}>
      <form onSubmit={handleLogin}>
        <table style={{textAlign: 'center'}}>
          <tbody>

            <tr>
              <td>Username: </td>
              <td>
                <input
                  id='username'
                  type='text'
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>Password: </td>
              <td>
                <input
                  id='password'
                  type='password'
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </td>
            </tr>

            <tr>
              <td colSpan='2'>
                <button className='btn btn-outline-primary' id='loginButton' type='submit'>Log in</button>
              </td>
            </tr>

          </tbody>
        </table>
      </form>
    </div>
  )
}

export default LoginForm
