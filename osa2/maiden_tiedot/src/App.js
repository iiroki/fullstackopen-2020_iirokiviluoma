import React, {useState, useEffect} from 'react'
import countryService from './services/countries'
import SearchForm from './components/SearchForm'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState(null)

  // Haetaan maiden tiedot
  useEffect(() => {
    countryService
    .getCountries()
    .then(all => {
      setCountries(all)
    })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const setNewFilter = (newFilter) => {
    console.log(newFilter)
    setFilter(newFilter)
  }

  const countriesToShow = () => {
    if (filter === '') return countries

    const showedCountries = countries.filter(
      c => c.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    )

    return showedCountries
  }

  return (
    <div>
      <h1>FSO2020 - Maiden tiedot</h1>

      <SearchForm filter={filter} handleChange={handleFilterChange}/>

      <Countries countries={countriesToShow()} filter={filter} countryButtonHandler={setNewFilter} weather={weather}/>
    </div>
  );
}

export default App
