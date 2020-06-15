import React from 'react'

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
      <b>Languages</b>
      <ul>
          {languages.map(l =>
            <Language key={l.name} name={l.name}/>)}
      </ul>
    </div>
    
  )
}

const CountryInDetail = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>

      <Flag source={country.flag}/>

      Capital: {country.capital}<br/>
      Population: {country.population}<br/>
      <br/>
      <Languages languages={country.languages}/>
    </div>
  )
}

const Country = ({name}) => <div>{name}</div>

const Countries = ({countries, filter}) => {
  console.log(countries.length, 'countries found.')
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
        <CountryInDetail country={countries[0]}/>
      </div>
    )
  }

  // 2-10 maata listattuna
  else {
    return (
    <div>
      <b>Found:</b>
      {countries.map(c =>
          <Country key={c.name} name={c.name}/>)}
    </div>
    )
  }
}

export default Countries