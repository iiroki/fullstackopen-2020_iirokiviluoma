import React from 'react'

const SeachForm = ({filter, handleChange, clearHandler}) => {
  return (
    <form>
      <div>
        Find countries: <input value={filter} onChange={handleChange}/>
        <button onClick={clearHandler}>X</button>
      </div>
    </form>
  )
}

export default SeachForm