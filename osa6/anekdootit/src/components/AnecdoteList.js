import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, wipeNotification } from '../reducers/notificationReducer'

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
  const addVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(showNotification(`Vote +1 given to: ${anecdote.content}`))
  }

  const dispatch = useDispatch()

  const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => {
    return b.votes - a.votes
  }))

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
