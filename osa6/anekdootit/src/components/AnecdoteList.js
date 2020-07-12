import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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

  const anecdotes = useSelector(state => state.sort((a, b) => {
    return b.votes - a.votes
  }))

  return (
    <div>
      <ul>
        {anecdotes.map(a =>
          <Anecdote
            key={ a.id }
            anecdote={ a }
            handleVote={ () => dispatch(voteAnecdote(a.id)) }
          />
        )}
      </ul>
    </div>
  )
}

export default AnecdoteList
