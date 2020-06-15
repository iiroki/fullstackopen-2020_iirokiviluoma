import axios from 'axios'

const API_key = process.env.REACT_APP_API_KEY
const countriesAPI = 'https://restcountries.eu/rest/v2/all'
const weatherAPI = `http://api.weatherstack.com/current?access_key=${API_key}&query=`

const getCountries = () => {
  const request = axios.get(countriesAPI)
  return request.then(response => response.data)
}

const getWeather = (city) => {

}

export default {getCountries, getWeather}
