import React from 'react'

const PersonForm = (props) => {
  return (
    <div>
      <h2>Add new number</h2>
      <form onSubmit={props.add}>
        <div>
          Name: <input value={props.name} onChange={props.handleNameChange}/>
        </div>
        <div>
          Number: <input value={props.number} onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">Add new number</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm