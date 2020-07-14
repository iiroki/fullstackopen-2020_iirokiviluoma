const notificationAtStart = null
let notificationTimer = null

const notificationReducer = (state = notificationAtStart, action) => {
  switch (action.type) {
    case'SHOW_NOTIFICATION':
      return action.data

    case'WIPE_NOTIFICATION':
      return notificationAtStart

    default:
      return state
  }
}

export const showNotification = (message, seconds) => (
  async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: message
    })

    // Ajastin alkaa alusta uuden ilmoituksen kohdalla
    if (notificationTimer) clearTimeout(notificationTimer)

    notificationTimer = setTimeout(() => {
      dispatch({ type: 'WIPE_NOTIFICATION' })
      notificationTimer = null
    }, seconds * 1000)  // ms
  }
)

export const wipeNotification = () => {
  return {
    type: 'WIPE_NOTIFICATION'
  }
}

export default notificationReducer
