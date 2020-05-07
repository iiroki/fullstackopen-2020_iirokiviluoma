// Full Stack Open 2020
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Yhteenveto
const Statistics = (props) => {
  // Lasketaan keskiarvo
  let total = 0
  let pos_total = 0

  props.all.forEach(x => {
    total += x

    if (x === 1) {
      pos_total++
    }
  })

  const average = total / props.all.length
  const positive = pos_total / props.all.length

  return (
    <div>
      <h2>Statistics</h2>
      <p>Good: {props.good}</p>
      <p>Neutral: {props.neutral}</p>
      <p>Bad: {props.bad}</p>
      <p>Feedbacks: {props.all.length}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive}%</p>
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
  const [all, setAll] =useState([])

  const handleGoodFeedback = () => {
    setAll(all.concat(1))
    setGood(good + 1)
  }
  const handleNeutralFeedback = () => {
    setAll(all.concat(0))
    setNeutral(neutral + 1)
  }

  const handleBadFeedback = () => {
    setAll(all.concat(-1))
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGoodFeedback} text='Good'/>
      <Button onClick={handleNeutralFeedback} text='Neutral'/>
      <Button onClick={handleBadFeedback} text='Bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
