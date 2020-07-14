import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, wipeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

// Ajastimen kuuluisi olla yhteinen kaikille ilmoitustyypeille!
let timer = null

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // Anekdootti serverille
    const newAnecdote = await anecdoteService.addNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(showNotification(`New anecdote added: ${newAnecdote.content}`))

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
