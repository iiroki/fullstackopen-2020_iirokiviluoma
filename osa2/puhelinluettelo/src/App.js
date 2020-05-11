import React, { useState } from 'react'

const Numbers = (props) => {
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {props.persons.map(p => <li>{p.name}</li>)}
            </ul>
        </div>
    )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
      event.preventDefault()

        if (newName.length === 0) {
            console.log("addPerson: Can't submit empty field.")
            return
        }

      console.log('Added new person:', newName)
      setPersons(persons.concat({name: newName}))
      setNewName('')
  }

  const handleNameChange = (event) => {
      //console.log(event.target.value)
      setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Numbers persons={persons}/>
      ...
    </div>
  )
}

export default App