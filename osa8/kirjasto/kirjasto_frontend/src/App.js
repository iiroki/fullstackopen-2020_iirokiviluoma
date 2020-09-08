
import React, { useState, useEffect } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import Login from './components/Login'

const App = () => {
  const [login, setLogin] = useState(false)
  const [page, setPage] = useState('authors')

  useEffect(() => {
    const loginToken = window.localStorage.getItem('loginToken')

    if (loginToken) {
      setLogin(true)
    }
  }, [])

  const setToken = newToken => {
    if (!newToken) {
      window.localStorage.removeItem('loginToken')
    } else {
      window.localStorage.setItem('loginToken', newToken)
    }
  }
  
  const loggedInButtons = () => (
    <div style={{ display: 'inline' }}>
      <button onClick={() => setPage('add')}>add book</button>
      <button onClick={() => setPage('recommendations')}>
        recommendations
      </button>
    </div>
  )

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          login
            ? loggedInButtons()
            : null
        }
        
        {
          !login
            ? <button onClick={() => setPage('login')}>login</button>
            : <button onClick={() => { setLogin(false); setToken(null); setPage('authors') }}>
                logout
              </button>
        }
        
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page === 'recommendations'}
      />

      <Login
        show={page === 'login'}
        setLogin={setLogin}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App