import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

  const handleRandomAnecdote = () => {
    let rand_int = Math.floor(Math.random() * (props.anecdotes.length-1))

    // Ei samaa anekdoottia kahta kertaa putkeen!
    while (rand_int === selected) {
      rand_int = Math.floor(Math.random() * (props.anecdotes.length-1))
    }

    console.log('Random index:', rand_int)
    setSelected(rand_int)
  }

  const handleVoting = () => {
    const new_votes = [...votes]
    new_votes[selected] += 1
    setVotes(new_votes)
  }
  
  // Etsitään suosituimman anekdootin indeksi.
  let max_index = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>This anecdote has {votes[selected]} votes.</p>
      <p>
        <Button onClick={handleVoting} text="Vote"/>
        <Button onClick={handleRandomAnecdote} text='Random anecdote'/>
      </p>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[max_index]}</p>
      <p>This anecdote has {votes[max_index]} votes.</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
