import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const msg = useSelector(state => state.notification)

  if (msg === null) {
    return null
  }

  return (
    <div className='notification'>
      {msg}
    </div>
  )
}

export default Notification
