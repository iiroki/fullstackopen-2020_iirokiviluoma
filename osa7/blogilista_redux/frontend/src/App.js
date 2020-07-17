import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import User from './components/User'
import LoginForm from './components/LoginForm'
import LoggedUserInfo from './components/LoggedUserInfo'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { checkLogin } from './reducers/loginReducer'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'

const App = () => {
  const loggedUser = useSelector(state => state.login)

  const dispatch = useDispatch()
  const newBlogFormRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [dispatch])  // Activated after 1. render

  // Check if there is active login token
  useEffect(() => {
    dispatch(checkLogin())
  }, [dispatch])

  const NavigationMenu = () => (
    <nav className='navbar navbar-expand-lg navbarlight bg-light'>
      <span className='nav-item'><Link to='/'>Blogs</Link></span>
      <span className='nav-item'><Link to='/users'>Users</Link></span>
      
    </nav>
  )

  // Login page shown when there's no user logged in
  const loginPage = () => (
    <LoginForm />
  )

  // Main page shown to user who's logged in
  const MainPage = () => (
    <div>
      <LoggedUserInfo />

      <Togglable buttonLabel='New blog' ref={newBlogFormRef}>
        <NewBlogForm
          handleHide={() => newBlogFormRef.current.toggleVisibility()}
        />
      </Togglable>

      <BlogList currentUser={loggedUser.username} />
    </div>
  )

  const usersPage = () => (
    <div>
      <LoggedUserInfo />
      <UserList />
    </div>
  )

  const blogPage = (blogId) => (
    <div>
      <LoggedUserInfo />
      <Blog id={blogId} />
    </div>
  )

  const userPage = (userId) => (
    <div>
      <LoggedUserInfo />
      <User id={userId} />
    </div>
  )

  const blogMatch = useRouteMatch('/blogs/:id')
  
  const blogId = blogMatch
    ? blogMatch.params.id
    : null

  const userMatch = useRouteMatch('/users/:id')
  
  const userId = userMatch
    ? userMatch.params.id
    : null
  
  return (
    <div>
      <h1>Bloglist</h1>

      <NavigationMenu />

      <Notification />

      <Switch>
        <Route path={'/blogs/:id'}>
          {loggedUser === null
            ? loginPage()
            : blogPage(blogId)
          }
        </Route>

        <Route path={'/users/:id'}>
          {loggedUser === null
            ? loginPage()
            : userPage(userId)
          }
        </Route>

        <Route path={'/users'}>
          {loggedUser === null
            ? loginPage()
            : usersPage()
          }
        </Route>

        <Route path={'/'}>
          {loggedUser === null
            ? loginPage()
            : MainPage()
          }
        </Route>
      </Switch>

      
    </div>
  )
}

export default App