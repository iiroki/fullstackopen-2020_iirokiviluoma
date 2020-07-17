import React from 'react'
import { useSelector } from 'react-redux'
import { notificationTypes } from '../reducers/notificationReducer'

const Notification = () => {
  const { msg, type }= useSelector(state => state.notification)

  if (msg === null) {
    return null
  }

  switch (type) {
    case notificationTypes.GOOD:
      return (
        <div className='notificationGood'>
          {msg}
        </div>
      )
    
    case notificationTypes.ERROR:
      return (
        <div className='notificationError'>
          {msg}
        </div>
      )

    default:
      return null
  }
}

export default Notification
