import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Tila asetetaan oletustilaan uuden renderöinnin yhteydessä!
  // Eli uudestaan kirjautumissivulle saavuttaessa.

  const createLogin = (event) => {
    event.preventDefault()

    handleLogin({
      username: username,
      password: password
    })
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
                  type='text'
                  value={username}
                  name='Username'
                  onChange={({ target }) => setUsername(target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>Password: </td>
              <td>
                <input
                  type='password'
                  value={password}
                  name='Password'
                  onChange={({ target }) => setPassword(target.value)}
                />
              </td>
            </tr>

            <tr>
              <td colSpan='2'>
                <button type='submit'>Log in</button>
              </td>
            </tr>

          </tbody>
        </table>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
