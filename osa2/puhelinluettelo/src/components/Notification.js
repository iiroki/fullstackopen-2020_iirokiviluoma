import React from 'react'

const notificationTypes = {
  GOOD: 0,
  BAD: 1
}

const Notification = ({msg, type}) => {
  if (msg === null) {
    return null
  }

  if (type === notificationTypes.GOOD) {
    return (
      <div className='notification_good'>
        {msg}
      </div>
    )
  }

  return (
    <div className='notification_bad'>
      {msg}
    </div>
    )
}

export {Notification, notificationTypes}