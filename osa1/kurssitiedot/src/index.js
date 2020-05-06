// Full Stack Open 2020
// osa1: kurssitiedot
// iiroki
import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course_name}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        {props.p1} {props.ex1}
      </p>
      <p>
        {props.p2} {props.ex2}
      </p>
      <p>
      {props.p3} {props.ex3}
      </p>
      </div>
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course_name={course} />
      <Content p1={part1} ex1={exercises1} p2={part2} ex2={exercises2} p3={part3} ex3={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))