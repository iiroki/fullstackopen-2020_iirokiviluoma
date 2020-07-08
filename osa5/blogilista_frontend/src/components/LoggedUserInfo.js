import React from 'react'

const LoggedUserInfo = ({ name, handleLogout }) => (
  <div className='loggedUserInfo'>
    <b>Logged in as {name}</b>
    <button className='inlineButton' onClick={handleLogout}>Log out</button>
  </div>
)

export default LoggedUserInfo
