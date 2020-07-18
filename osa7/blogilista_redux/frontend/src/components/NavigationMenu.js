import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../reducers/loginReducer'
import { setNotification, notificationTypes } from '../reducers/notificationReducer'

const NavigationMenu = () => {
  const loggedUser = useSelector(state => state.login)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logOut())
    dispatch(setNotification('Logged out', notificationTypes.GOOD))
  }

  const getUserInfo = () => {
    if (!loggedUser) {
      return (
        <span className='nav-item ml-auto' style={navStyle}>Not logged in</span>
      )
    } else {
      return (
        <span className='nav-item ml-auto' style={navStyle}>
          Logged in: {loggedUser.name}
          <button
            className='btn btn-primary'
            style={{
              marginLeft: '10px',
              padding: '3px 5px',
              fontSize: '18px'}}
            onClick={handleLogout}
          >
            Log out
          </button>
        </span>
      )
    }
  }

  const navStyle = {
    margin: '2px 10px',
    fontSize: '18px'
  }    

  return (
    <nav className='navbar navbar-expand-lg navbardark bg-light'>
      <span className='nav-item' style={navStyle}><Link to='/'>Blogs</Link></span>
      <span className='nav-item' style={navStyle}><Link to='/users'>Users</Link></span>
      {getUserInfo()}
    </nav>
  )
}

export default NavigationMenu
