import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, wipeNotification } from '../reducers/notificationReducer'

// Ajastimen kuuluisi olla yhteinen kaikille ilmoitustyypeille!
let timer = null

const Anecdote = ({ anecdote, handleVote }) => (
  <li>
    <div>
      {anecdote.content}
    </div>

    <div>
      has {anecdote.votes}

      <button onClick={handleVote}>
        Vote
      </button>
    </div>
  </li>
)

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const addVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(showNotification(`Vote +1 given to: ${anecdote.content}`))

    if (timer) {
      clearTimeout(timer)
    }
    
    timer = setTimeout(() => {
      dispatch(wipeNotification())
      timer = null
    }, 5000)
  }

  const filter = useSelector(state => state.filter)

  // Filtteröidään filtterin ja järjestetään tykkäysten perusteella
  const anecdotes = useSelector(state => state.anecdotes
    .filter(a => a.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    .sort((a, b) => b.votes - a.votes))

  return (
    <div>
      <ul>
        {anecdotes.map(a =>
          <Anecdote
            key={ a.id }
            anecdote={ a }
            handleVote={ () => addVote(a) }
          />
        )}
      </ul>
    </div>
  )
}

export default AnecdoteList
