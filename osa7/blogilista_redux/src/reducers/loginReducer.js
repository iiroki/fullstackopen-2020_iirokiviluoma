import blogService from '../services/blogs'
import loginService from '../services/login'

const loginAtStart = null

const loginReducer = (state = loginAtStart, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data

    case 'REMOVE_USER':
      return loginAtStart

    default:
      return state
  }
}

export const checkLogin = () => (
  thunk => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')

    if (loggedUserJson) {
      const loggedUser = JSON.parse(loggedUserJson)
      blogService.setToken(loggedUser.token)
      
      thunk({
        type: 'SET_USER',
        data: loggedUser
      })
    }
  }
)

export const logIn = (loginObject) => (
  async thunk => {
    try {
      const userToLogIn = await loginService.login(loginObject)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(userToLogIn)
      )

      blogService.setToken(userToLogIn.token)

      thunk({
        type: 'SET_USER',
        data: userToLogIn
      })

      return true
    }
    catch (error) {
      console.log(error.message)
      return false
    }
  }
)

export const logOut = () => (
  thunk => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)

    thunk({
      type: 'REMOVE_USER'
    })
  }
)

export default loginReducer
