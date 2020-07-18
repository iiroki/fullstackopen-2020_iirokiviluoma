import React from 'react'
import { useSelector } from 'react-redux'
import { notificationTypes } from '../reducers/notificationReducer'

const Notification = () => {
  const { msg, type }= useSelector(state => state.notification)

  if (msg === null) {
    return null
  }

  const margin = {
    margin: '15px 15px'
  }

  switch (type) {
    case notificationTypes.GOOD:
      return (
        <div className='alert alert-success' style={margin}>
          {msg}
        </div>
      )
    
    case notificationTypes.ERROR:
      return (
        <div className='alert alert-danger' style={margin}>
          {msg}
        </div>
      )

    default:
      return null
  }
}

export default Notification
