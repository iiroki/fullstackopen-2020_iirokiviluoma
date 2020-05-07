// Full Stack Open 2020
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Yksittäinen tilastorivi
const StatisticLine = (props) => {
  if (props.percent === true) {
    return (
      <tr>
        <td>{props.text}:</td>
        <td>{props.amount}%</td>
      </tr>
    )
  }

  return (
    //<table> border="1"</table>
    <tr>
      <td>{props.text}:</td>
      <td>{props.amount}</td>
    </tr>
  )
}

// Yhteenveto
const Statistics = (props) => {
  if (props.all.length === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        No feedbacks given yet.
      </div>
    )
  }

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
  const positive = (pos_total / props.all.length) * 100 // Prosentteina

  // Palautetaan tilastot
  return (
    <div>
      <h2>Statistics</h2>

      {/*Taulukko*/}
      <table cellPadding="3">
        <tbody>
          <StatisticLine text='Good' amount={props.good} percent={false}/>
          <StatisticLine text='Neutral' amount={props.neutral} percent={false}/>
          <StatisticLine text='Bad' amount={props.bad}/>
          <StatisticLine text='Feedbacks' amount={props.all.length} percent={false}/>
          <StatisticLine text='Average' amount={average.toFixed(1)} percent={false}/>
          <StatisticLine text='Positive' amount={positive.toFixed(1)} percent={true}/>
        </tbody>
      </table>
    </div>
  )
}

// Yksittäinen palautenappi
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
