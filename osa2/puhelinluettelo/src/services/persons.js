import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const appendNew = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  const url = `${baseUrl}/${id}`
  const request = axios.delete(url)
  return request.then(response => response.data)
}

const modifyPerson = (id, newPerson) => {

}

export default {getAll, appendNew, deletePerson, modifyPerson}