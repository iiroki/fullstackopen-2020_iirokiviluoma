import React from 'react'

const SeachForm = (props) => {
  return (
    <form>
      <div>
        Find countries: <input value={props.filter} onChange={props.handleChange} />
      </div>
    </form>
  )
}

export default SeachForm