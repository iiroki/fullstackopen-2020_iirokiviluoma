import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

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
    dispatch(voteAnecdote(anecdote))
    dispatch(showNotification(`Vote +1 given to: ${anecdote.content}`, 5))
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
