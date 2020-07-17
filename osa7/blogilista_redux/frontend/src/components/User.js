import React from 'react'
import { useSelector } from 'react-redux'

const User = ({ id }) => {
  const user = useSelector(state => state.users)
    .find(u => u.id === id)

  if (!user) return null

  return (
    <div>
      <h3>{user.name}</h3>
      <b>Blogs:</b>

      <ul>
        {user.blogs.map(b => 
          <li key={b.id}>{b.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User
