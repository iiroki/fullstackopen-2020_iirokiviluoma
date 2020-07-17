import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { setNotification, notificationTypes } from '../reducers/notificationReducer'

const LoggedUserInfo = () => {
  const name = useSelector(state => state.user.name)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logOut())
    dispatch(setNotification('Logged out', notificationTypes.GOOD))
  }

  return (
    <div className='loggedUserInfo'>
      <b>Logged in as {name}</b>
      <button className='logoutButton' onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default LoggedUserInfo
