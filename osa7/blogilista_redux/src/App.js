import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import LoggedUserInfo from './components/LoggedUserInfo'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { checkLogin } from './reducers/userReducer'
import { initBlogs } from './reducers/blogReducer'

const App = () => {
  const user = useSelector(state => state.user)

  const newBlogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])  // Activated after 1. render

  // Check if there is active login token
  useEffect(() => {
    dispatch(checkLogin())
  }, [dispatch])

  // Kirjautumattomalle käyttäjälle näytettävä sivu
  const loginPage = () => (
    <LoginForm />
  )

  // Kirjautuneelle käyttäjälle näytettävä sivu
  const loggedInPage = () => (
    <div>
      <LoggedUserInfo />

      <Togglable buttonLabel='New blog' ref={newBlogFormRef}>
        <NewBlogForm
          handleHide={() => newBlogFormRef.current.toggleVisibility()}
        />
      </Togglable>

      <BlogList currentUser={user.username} />
    </div>
  )

  return (
    <div>
      <h1>Bloglist</h1>

      <Notification />

      <Switch>
        <Route path={'/users'}>
          Users...
        </Route>

        <Route path={'/'}>
          {user === null
            ? loginPage()
            : loggedInPage()
          }
        </Route>
      </Switch>

      
    </div>
  )
}

export default App