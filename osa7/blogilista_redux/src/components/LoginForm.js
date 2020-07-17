import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logIn } from '../reducers/userReducer'
import { setNotification, notificationTypes } from '../reducers/notificationReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  // Tila asetetaan oletustilaan uuden renderöinnin yhteydessä!
  // Eli uudestaan kirjautumissivulle saavuttaessa.

  const createLogin = (event) => {
    event.preventDefault()

    dispatch(logIn({
      username: username,
      password: password
    }))

    dispatch(setNotification('Login successful', notificationTypes.GOOD))
  }

  return (
    <div>
      <form onSubmit={createLogin}>
        <table>
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
                <button id='loginButton' type='submit'>Log in</button>
              </td>
            </tr>

          </tbody>
        </table>
      </form>
    </div>
  )
}

export default LoginForm
