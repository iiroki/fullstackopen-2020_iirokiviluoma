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
      <Part p={props.parts[0].name} e ={props.parts[0].exercises}/>
      <Part p={props.parts[1].name} e ={props.parts[1].exercises}/>
      <Part p={props.parts[2].name} e ={props.parts[2].exercises}/>
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
  const sum = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises

  return (
    <div>
      Number of exercises {sum}
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14  
      }
    ]
  }

  return (
    <div>
      <Header course_name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
