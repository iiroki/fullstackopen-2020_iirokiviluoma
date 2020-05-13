import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SearchForm from './components/SearchForm'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  // Haetaan maiden tiedot
  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
      //debugger
    })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = () => {
    if (filter === '') return countries

    return countries.filter(
      c => c.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    )
  }

  return (
    <div>
      <h1>FSO2020 - Maiden tiedot</h1>

      <SearchForm filter={filter} handleChange={handleFilterChange}/>

      <Countries countries={countriesToShow()} filter={filter}/>
    </div>
  );
}

export default App
