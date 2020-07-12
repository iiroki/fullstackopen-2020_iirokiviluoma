const notificationAtStart = null

const notificationReducer = (state = notificationAtStart, action) => {
  switch (action.type) {
    case('SHOW_NOTIFICATION'):
      return action.data.message
    
    case('WIPE_NOTIFICATION'):
      return notificationAtStart

    default:
      return state
  }
}

export const showNotification = (message) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: {
      message: message
    }
  }
}

export const wipeNotification = () => {
  return {
    type: 'WIPE_NOTIFICATION'
  }
}

export default notificationReducer
