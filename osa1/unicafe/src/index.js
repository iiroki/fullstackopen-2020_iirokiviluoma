// Full Stack Open 2020
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Yhteenveto
const Statistics = (props) => {
  return (
    <div>
      <h2>Statistics</h2>
      <p>Good: {props.good}</p>
      <p>Neutral: {props.neutral}</p>
      <p>Bad: {props.bad}</p>
    </div>
  )
}

// Nappi
const Button = (props) => {
  const {onClick, text} = props

  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => setGood(good + 1)
  const handleNeutralFeedback = () => setNeutral(neutral + 1)
  const handleBadFeedback = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGoodFeedback} text='Good'/>
      <Button onClick={handleNeutralFeedback} text='Neutral'/>
      <Button onClick={handleBadFeedback} text='Bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
