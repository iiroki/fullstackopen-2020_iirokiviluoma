import React from 'react'
import { useSelector } from 'react-redux'

const notificationTypes = {
  NONE: null,
  GOOD: 0,
  ERROR: 1
}

const Notification = () => {
  const msg = useSelector(state => state.notification)

  if (msg === null) {
    return null
  }

  /*if (type === notificationTypes.GOOD) {
    return (
      <div className='notificationGood'>
        {msg}
      </div>
    )
  }

  if (type === notificationTypes.ERROR) {
    return (
      <div className='notificationError'>
        {msg}
      </div>
    )
  }

  else return null*/
  return (
    <div className='notificationGood'>
      {msg}
    </div>
  )
}

export {
  Notification,
  notificationTypes
}
