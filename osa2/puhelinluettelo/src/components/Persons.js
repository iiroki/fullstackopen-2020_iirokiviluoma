import React from 'react'

const Person = (props) => {
  return (
    <li>
      {props.name}: {props.number}
      <button onClick={props.del}>Delete</button>
    </li>
  )
}

const Persons = ({persons, delPerson}) => {
  //debugger
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(p =>
          <Person key={p.name} name={p.name} number={p.number}
            del={() => delPerson(p.id)}/>)}
      </ul>
    </div>
  )
}

export default Persons