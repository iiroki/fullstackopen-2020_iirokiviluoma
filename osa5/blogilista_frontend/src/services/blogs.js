import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = 'BEARER ' + newToken
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNew = async (contents) => {
  const config = {
    headers: { Authorization: token}
  }
  
  const response = await axios.post(baseUrl, contents, config)
  return response.data
}

const addLike = async (id, contents) => {
  const url = `${baseUrl}/${id}`
  const response = await axios.put(url, contents)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token}
  }

  const url = `${baseUrl}/${id}`
  const response = await axios.delete(url, config)
  return response.data
}

export default {
  setToken,
  getAll,
  addNew,
  addLike,
  deleteBlog
}
