import React from 'react'

const Weather = ({capital, weather, weatherHandler}) => {
  const weatherIconStyle = {
    objectFit: 'cover',
    width: '100px',
    height: '100%'
  }

  let weatherBlock = null

  if (weather === null) {
    weatherBlock =
    <div>
      <button onClick={() => weatherHandler(capital)}>Load weather info</button>
    </div>
  }
  else {
    weatherBlock =
    <div>
      <b>Temperature:</b> {weather.current.temperature} Celcius
      
      <br/>

      <b>Wind:</b> {weather.current.wind_speed} mph, 
      direction {weather.current.wind_dir}
      
      <br/>

      <img
        style={weatherIconStyle}
        src={weather.current.weather_icons[0]}
        alt={weather.current.weather_descriptions[0]}/>

      <br/>

      <i>(weatherstack {weather.current.observation_time})</i>
    </div>
  }

  return (
    <div>
      <h3>Weather in {capital}</h3>
      {weatherBlock}
    </div>
  )
}

const Flag = ({source}) => {
  const flagStyle = {
    objectFit: 'cover',
    width: '250px',
    height: '100%'
  }

  return (
    <div>
      <img style={flagStyle} src={source} alt="Flag"/>
    </div>
  )
}

const Language = ({name}) => <li>{name}</li>

const Languages = ({languages}) => {
  return (
    <div>
      <h3>Languages</h3>
      <ul>
          {languages.map(l =>
            <Language key={l.name} name={l.name}/>)}
      </ul>
    </div>
    
  )
}

const CountryInDetail = ({country, weather, weatherHandler}) => {
  return (
    <div>
      <h2>{country.name}</h2>

      <Flag source={country.flag}/>

      Capital: {country.capital}<br/>
      Population: {country.population}<br/>
      <br/>
      <Languages languages={country.languages}/>

      <Weather capital={country.capital} weather={weather} weatherHandler={weatherHandler}/>
    </div>
  )
}

const Country = ({name, countryButtonHandler}) => {
  return (
    <div>
      {name}{' '}
      <button onClick={() => countryButtonHandler(name)}>Show</button>
    </div>
  )
}

const Countries = ({countries, filter, countryButtonHandler, weather, weatherHandler}) => {
  // Ei filtteriä -> ohjeistus
  if (filter === '') {
    return (
      <div>
        Start searching by typing.
      </div>
    )
  }

  // Ei hakutulosta
  else if (countries.length === 0) {
    return (
      <div>
        No matching countries.
      </div>
    )
  }

  // Liikaa maita tulostettavaksi
  else if (countries.length > 10) {
    return (
      <div>
        Too many matches, try narrowing down.
      </div>
    )
  }

  // Yksittäinen maa yksityiskohtaisine tietoineen
  else if (countries.length === 1) {
    return (
      <div>
        <CountryInDetail country={countries[0]} weather={weather} weatherHandler={weatherHandler}/>
      </div>
    )
  }

  // 2-10 maata listattuna
  else {
    return (
    <div>
      <b>Found:</b>
      {countries.map(c =>
          <Country key={c.name} name={c.name} countryButtonHandler={countryButtonHandler}/>)}
    </div>
    )
  }
}

export default Countries