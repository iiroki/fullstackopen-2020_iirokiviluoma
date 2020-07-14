import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'VOTE_ANECDOTE':
      const id = action.data.id

      return state.map(a =>
        a.id === id ? action.data : a)

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export const createAnecdote = (content) => (
  async dispatch => {
    const newAnecdote = await anecdoteService.addNew(content)

    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
)

export const voteAnecdote = (anecdote) => (
  async dispatch => {
    const id = anecdote.id

    const anecdoteToVote = {
      content: anecdote.content,
      votes: anecdote.votes + 1
    }

    const votedAnecdote = await anecdoteService.modifyExisting(id, anecdoteToVote)

    dispatch({
      type: 'VOTE_ANECDOTE',
      data: votedAnecdote
    })
  }
)

export const initAnecdotes = (anecdotes) => (
  async dispatch => {
    const anecdotes = await anecdoteService.getAll()

    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
)
export default anecdoteReducer