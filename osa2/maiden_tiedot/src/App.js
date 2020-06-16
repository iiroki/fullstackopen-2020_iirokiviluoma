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

  const handleClear = (event) => {
    event.preventDefault()
    setNewFilter('')
    setWeather(null)
  }

  const setNewFilter = (newFilter) => {
    console.log('Filter set on:', newFilter)
    setFilter(newFilter)
  }

  const countriesToShow = () => {
    if (filter === '') return countries

    const showedCountries = countries.filter(
      c => c.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    )

    if (showedCountries.length > 1) {
      if (weather !== null) {
        setWeather(null)
      }
    }

    return showedCountries
  }

  const getWeatherInfo = (city) => {
    console.log('Requested weather:', city)
    
    countryService
      .getWeather(city)
      .then(weather => {
        console.log('Promise fulfilled:', weather)
        setWeather(weather)
      })
  }

  return (
    <div>
      <h1>FSO2020 - Maiden tiedot</h1>

      <SearchForm filter={filter} handleChange={handleFilterChange} clearHandler={handleClear}/>

      <Countries countries={countriesToShow()} filter={filter} countryButtonHandler={setNewFilter} weather={weather} weatherHandler={getWeatherInfo}/>
    </div>
  )
}

export default App
