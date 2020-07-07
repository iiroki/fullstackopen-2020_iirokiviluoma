import React from 'react'

const LoginForm = (props) => (
  <div>
    <form onSubmit={props.handleLogin}>
      <table cellPadding='1'>
        <tbody>

          <tr>
            <td>Username: </td>
            <td>
              <input
                type='text'
                value={props.username}
                name='Username'
                onChange={({ target }) => props.handleUsernameChange(target)}
              />
            </td>
          </tr>
          
          <tr>
            <td>Password: </td>
            <td>
              <input
                type='password'
                value={props.password}
                name='Password'
                onChange={({ target }) => props.handlePasswordChange(target)}
              />
            </td>
          </tr>

          <tr>
            <td colSpan='3'>
              <button type='submit'>Log in</button>
            </td>
          </tr>
        
        </tbody>
      </table>
    </form>
  </div>
)

export default LoginForm
