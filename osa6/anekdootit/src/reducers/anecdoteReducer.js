const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)

      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }

      return state.map(a =>
        a.id === id ? votedAnecdote : a)

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: anecdote
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: {
      id: id
    }
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export default anecdoteReducer