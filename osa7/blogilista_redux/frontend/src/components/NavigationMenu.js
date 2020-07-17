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

  if (!loggedUser) {
    return (
      <nav className='navbar navbar-expand-lg navbarlight bg-light'>
        <span className='nav-item' style={{padding: '5px'}}><Link to='/'>Blogs</Link></span>
        <span className='nav-item' style={{padding: '5px'}}><Link to='/users'>Users</Link></span>
        <span className='nav-item ml-auto' style={{padding: '5px'}}>Not logged in</span>
      </nav>
    )
  }

  return (
    <nav className='navbar navbar-expand-lg navbarlight bg-light'>
      <span className='nav-item' style={{padding: '5px'}}><Link to='/'>Blogs</Link></span>
      <span className='nav-item' style={{padding: '5px'}}><Link to='/users'>Users</Link></span>

      <span className='nav-item ml-auto' style={{padding: '5px'}}>
        Logged in: {loggedUser.name}
        <button className='btn btn-outline-primary' style={{marginLeft: '10px'}} onClick={handleLogout}>
          Log out
        </button>
      </span>
    </nav>
  )
}

export default NavigationMenu
