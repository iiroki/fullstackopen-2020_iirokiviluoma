import React from 'react'

const Person = (props) => {
  return <li>{props.name}: {props.number}</li>
}

const Persons = ({persons}) => {
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

export default Persons