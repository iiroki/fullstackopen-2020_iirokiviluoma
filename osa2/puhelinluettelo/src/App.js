import React, {useState, useEffect} from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  // Sovelluksen tilat
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Haetaan tiedot palvelimelta.
  useEffect(() => {
    // Haetaan kaikki palvelimen henkilöt.
    personService
      .getAll()
      .then(all => {
        setPersons(all)
      })
  }, [])  // Aktivoidaan 1. renderöinnin jälkeen.

  // Nollataan lisäyskentät tarvittaessa.
  const resetFields = () => {
    setNewName('')
    setNewNumber('')
  }

  // Lisätään uusi numero osoitekirjaan.
  const addPerson = (event) => {
    // Ei uudelleenohjausta
    event.preventDefault()

    // Tyhjiä kenttiä ei sallita!
    if (newName.length === 0 || newNumber.length === 0) {
      return
    }

    // Jos nimi löytyy jo puhelinluettelosta.
    if (persons.some(p => p.name === newName)) {
      // Jos halutaan korvata vanha numero uudella.
      if (!window.confirm(`${newName} is already in the phonebook!\nReplace the old number?`)) {
        return
      }

      // Suoritetaan etsintä toisen kerran, mikä hieman turhaa.
      const person = persons.find(p => p.name === newName)
      const changedPerson = {...person, number: newNumber}

      // Muokataan henkilön tietoja ja huolehditaan sovellukset tilasta.
      personService
        .modifyPerson(changedPerson.id, changedPerson)
        .then(modifiedPerson => {
          setPersons(persons.map(
            p => p.id !== modifiedPerson.id ? p : modifiedPerson
          ))
        })
      
      resetFields()
      return
    }

    // Lisätään uusi henkilö palvelimelle
    personService
      .appendNew({name: newName, number: newNumber})
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        resetFields()
      })
  }

  const deletePerson = (id) => {
    const target = persons.find(p => p.id === id)

    // Vahvistetaan poisto
    if (!window.confirm(`Delete ${target.name}?`)) {
      return
    }

    // Poistetaan kyseinen henkilö...
    personService
      .deletePerson(id)
      .then(response => {
        console.log(response)
      })

    //... ja asetetaan tila oikeaksi (poiston jälkeen)
    personService
      .getAll()
      .then(all => {
        setPersons(all)
      })
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

      <Persons persons={personsToShow()} delHandler={deletePerson}/>
    </div>
  )
}

export default App