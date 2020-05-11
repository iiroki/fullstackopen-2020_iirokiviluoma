import React, { useState } from 'react'

const Person = (props) => {
    return (
        <li>{props.name}</li>
    )
}

const Numbers = (props) => {
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {props.persons.map(p => <Person key={p.name} name={p.name}/>)}
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
            console.log("Can't submit empty field.")
            return
        }

        // Jos nimi löytyy jo puhelinluettelosta
        if (persons.some(p => p.name === newName)) {
            alert(`${newName} is already in the phonebook!`)
            setNewName('')
            return
        }

      console.log('Added new person:', newName)
      setPersons(persons.concat({name: newName}))
      setNewName('')
  }

  const handleNameChange = (event) => {
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
    </div>
  )
}

export default App