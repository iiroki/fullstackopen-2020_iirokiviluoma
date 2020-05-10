// Full Stack Open 2020
// osa1: kurssitiedot
// iiroki
import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course_name}) => {
  return <h1>{course_name}</h1>
}

const Content = ({parts}) => {
  //console.log(parts)
  return (
    <div>
      {parts.map(p =>
        <Part key={p.name} name={p.name} exercises={p.exercises}/>)}
    </div>
  )
}

const Part = ({name, exercises}) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, p) => {
    //console.log('SUM:', sum, 'CURRENT:', p.exercises)
    return sum + p.exercises
  }, 0)

  return (
    <div>
      <b>Total of {total} exercises</b>
    </div>
  )
}

// Kurssi
const Course = ({course}) => {
  return (
    <div>
      <Header course_name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
