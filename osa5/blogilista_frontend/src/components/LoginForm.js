import React from 'react'

const LoginForm = (props) => {
  const loginStyle = {
    textAlign: 'center'
  }

  return (
    <div>
      <form onSubmit={props.handleLogin}>
        <table style={loginStyle} cellPadding='1'>
          <tbody>

            <tr>
              <td>Username: </td>
              <td>
                <input
                  type='text'
                  value={props.username}
                  onChange={props.handleUsernameChange}
                />
              </td>
            </tr>
            
            <tr>
              <td>Password: </td>
              <td>
                <input
                  type='password'
                  value={props.password}
                  onChange={props.handlePasswordChange}
                />
              </td>
            </tr>

            <tr>
              <td colSpan='3'>
                <button>Log in</button>
              </td>
            </tr>
          
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default LoginForm
