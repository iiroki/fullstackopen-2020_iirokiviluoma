import React from 'react'

const LoggedUserInfo = ({ name, handleLogout }) => (
  <div className='logged_user_info'>
    <b>Logged in as {name} </b>
    <button onClick={handleLogout}>Log out</button>
  </div>
)

export default LoggedUserInfo
