const notificationAtStart = null
let notificationTimer = null

const notificationTime = 5000 // ms

const notificationReducer = (state = notificationAtStart, action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    
    case 'RESET_NOTIFICATION':
      return notificationAtStart

    default:
      return state
  }
}

export const setNotification = (msg) => (
  dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: msg
    })
  
    if (notificationTimer) clearTimeout(notificationTimer)

    notificationTimer = setTimeout(() => {
      dispatch({ type: 'RESET_NOTIFICATION' })
      notificationTimer = null
    }, notificationTime)
  }
)

export default notificationReducer