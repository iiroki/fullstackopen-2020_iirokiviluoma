import React from 'react'

const notificationTypes = {
  NONE: null,
  GOOD: 0,
  ERROR: 1
}

const Notification = ({ msg, type }) => {
  if (msg === null) {
    return null
  }

  if (type === notificationTypes.GOOD) {
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

  else return null
}

export {
  Notification,
  notificationTypes
}
