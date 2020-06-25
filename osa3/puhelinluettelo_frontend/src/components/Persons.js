import React from 'react'

const Person = ({name, number, handleDel}) => {
  return (
    <li>
      {name}: {number}
      <button onClick={handleDel}>Delete</button>
    </li>
  )
}

// persons = Kaikki tulostettavat henkilöt
// delHandler = Henkilön poiston tapahtumankäsittelijä
const Persons = ({persons, delHandler}) => {
  //debugger
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(p =>
          <Person key={p.name} name={p.name} number={p.number}
            handleDel={() => delHandler(p.id)}/>)}
      </ul>
    </div>
  )
}

export default Persons