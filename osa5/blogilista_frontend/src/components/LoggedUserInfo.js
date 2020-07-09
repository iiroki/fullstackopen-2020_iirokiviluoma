import React from 'react'
import PropTypes from 'prop-types'

const LoggedUserInfo = ({ name, handleLogout }) => (
  <div className='loggedUserInfo'>
    <b>Logged in as {name}</b>
    <button className='logoutButton' onClick={handleLogout}>Log out</button>
  </div>
)

LoggedUserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default LoggedUserInfo
