import React from 'react'

const Header = ({course_name}) => {
  return <h2>{course_name}</h2>
}

const Content = ({parts}) => {
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
    return sum + p.exercises
  }, 0)

  return (
    <div>
      <b>Total of {total} exercises</b>
    </div>
  )
}

// Kurssi, joka exportataan.
const Course = ({course}) => {
  return (
    <div>
      <Header course_name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course