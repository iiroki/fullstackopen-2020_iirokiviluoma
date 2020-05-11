import React, {useState} from 'react'

const Person = (props) => {
  return <li>{props.name}: {props.number}</li>
}

const Numbers = ({persons}) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(p =>
          <Person key={p.name} name={p.name} number={p.number}/>)}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1231244'
    }
  ]) 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const resetFields = () => {
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (event) => {
    // Ei uudelleenohjausta
    event.preventDefault()

    // Tyhjiä kenttiä ei sallita
    if (newName.length === 0 || newNumber.length === 0) {
      console.log("Can't submit empty field.")
      return
    }

    // Jos nimi löytyy jo puhelinluettelosta
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already in the phonebook!`)
      return
    }

    setPersons(persons.concat({name: newName, number: newNumber}))
    resetFields()
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">Add new number</button>
        </div>
      </form>
      <Numbers persons={persons}/>
    </div>
  )
}

export default App