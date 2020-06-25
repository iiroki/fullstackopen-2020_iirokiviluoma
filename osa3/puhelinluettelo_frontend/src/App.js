import React, {useState, useEffect} from 'react'
import './index.css'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import {Notification, notificationTypes} from './components/Notification'


const App = () => {
  // Sovelluksen tilat
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [notificationType, setNotificationType] = useState(notificationTypes.GOOD)

  const notificationTime = 3000

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

  // Ilmoitus ja sen pyyhkiminen ajan myötä.
  const showNotification = (msg, type) => {
    setNotificationType(type)  // Oikeanlainen ilmoitus

    setNotificationMsg(msg)
      setTimeout(() => {
        setNotificationMsg(null)
      }, notificationTime)
  }

  // Lisätään uusi numero osoitekirjaan.
  const addPerson = (event) => {
    // Ei uudelleenohjausta
    event.preventDefault()

    // Tyhjiä kenttiä ei sallita!
    if (newName.length === 0 || newNumber.length === 0) {
      return
    }

    // TODO: Olemassa olevan numeron muokkaus!
    // ...

    // Lisätään uusi henkilö palvelimelle
    personService
      .appendNew({name: newName, number: newNumber})
      .then(returnedPerson => {
        debugger
        setPersons(persons.concat(returnedPerson))
        resetFields()
      })

    showNotification(`Added: ${newName}`, notificationTypes.GOOD)
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
      .catch(error => {
        showNotification(`Error: ${target.name} is already deleted from server.`,
          notificationTypes.BAD)
        return
      })

    //... ja asetetaan tila oikeaksi (poiston jälkeen)
    setPersons(persons.filter(p => p.id !== id))
    showNotification(`Deleted: ${target.name}`, notificationTypes.GOOD)
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

      <Notification msg={notificationMsg} type={notificationType}/>

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