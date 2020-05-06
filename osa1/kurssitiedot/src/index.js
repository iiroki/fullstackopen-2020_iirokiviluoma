// Full Stack Open 2020
// osa1: kurssitiedot
// iiroki
import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  console.log(props)
  return <h1>{props.course_name}</h1>
}

const Content = (props) => {
  return (
    <div>
      <Part p={props.p1} e ={props.e1}/>
      <Part p={props.p2} e ={props.e2}/>
      <Part p={props.p3} e ={props.e3}/>
      </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.p} {props.e}
    </p>
  )
}

const Total = (props) => {
  return (
    <div>
      Number of exercises {props.total}
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }

  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }

  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course_name={course} />
      <Content p1={part1.name} e1={part1.exercises}
      p2={part2.name} e2={part2.exercises}
      p3={part3.name} e3={part3.exercises} />
      <Total total={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
