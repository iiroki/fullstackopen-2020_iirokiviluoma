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

const addNew = async (blogContent) => {
  const config = {
    headers: { Authorization: token}
  }
  const response = await axios.post(baseUrl, blogContent, config)
  return response.data
}

export default {
  setToken,
  getAll,
  addNew
}
