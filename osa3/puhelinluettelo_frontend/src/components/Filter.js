import React from 'react'

const Filter = (props) => {
  return (
    <form>
      <div>
        Search: <input value={props.filter} onChange={props.handleChange}/>
      </div>
    </form>
  )
}

export default Filter