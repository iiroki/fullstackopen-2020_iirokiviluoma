import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, wipeNotification } from '../reducers/notificationReducer'

let timer = null

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(showNotification(`New anecdote added: ${content}`))

    if (timer) {
      clearTimeout(timer)
    }
    
    timer = setTimeout(() => {
      dispatch(wipeNotification())
      timer = null
    }, 5000)
  }

  return (
    <div>
      <h3>Create new:</h3>

      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
