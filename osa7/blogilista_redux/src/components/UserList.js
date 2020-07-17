import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const UserTableItem = ({ user }) => (
  <tr>
    <td>{user.name}</td>
    <td>{user.blogs.length}</td>
  </tr>
)

const UserList = () => {
  const users = useSelector(state => state.users
    .sort((a, b) => b.blogs.length - a.blogs.length))

  const tableStyle = {
    align: 'left'
  }

  return (
    <div>
      <h3>Users</h3>
      
      <table style={{textAlign: 'left'}}>
        <tbody>
          <tr>
            <td><b>Name</b></td>
            <td><b>Blogs created</b></td>
          </tr>
          {users.map(u => (
            <UserTableItem key={u.id} user={u} />
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default UserList
