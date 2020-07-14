import axios from 'axios'

const baseUrl = 'http://localhost:3004/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNew = async (content) => {
  const anecdoteToAdd = {
    content: content,
    votes: 0
  }

  const response = await axios.post(baseUrl, anecdoteToAdd)
  return response.data
}

const modifyExisting = async (id, object) => {
  const url = `${baseUrl}/${id}`
  const response = await axios.put(url, object)
  return response.data
}

export default {
  getAll,
  addNew,
  modifyExisting
}
