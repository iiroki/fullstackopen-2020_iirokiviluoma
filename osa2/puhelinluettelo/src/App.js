import React, {useState} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const data = [
  {
    name: 'Arto Hellas', number: '040-1231244'
  },
  {
    name: 'Ada Lovelace', number: '39-44-5323523'
  },
  {
    name: 'Dan Abramov', number: '12-43-234345'
  },
  {
    name: 'Mary Poppendieck', number: '39-23-6423122'
  }
]

const App = () => {
  const [persons, setPersons] = useState(data) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const resetFields = () => {
    setNewName('')
    setNewNumber('')
  }

  // Lisätään uusi numero osoitekirjaan.
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

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  // Valitaan, mitkä nimet näytetään osoitekirjassa hakukentän perusteella.
  const personsToShow = () => {
    if (filter === '') {
      return persons
    }
    // Palautetaan ainoastaan hakukentän mukaiset.
    return persons.filter(
      p => p.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    )
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter filter={filter} handleChange={handleFilterChange}/>

      <PersonForm
        add={addPerson}
        name={newName} handleNameChange={handleNameChange}
        number={newNumber} handleNumberChange={handleNumberChange}
      />

      <Persons persons={personsToShow()}/>
    </div>
  )
}

export default App