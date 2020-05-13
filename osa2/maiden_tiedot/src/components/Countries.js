import React from 'react'

const CountryInDetail = (props) => {
  return (
    <div>
      CountryInDetail
    </div>
  )
}

const Country = (props) => {
  return (
    <div>
      {props.name}
    </div>
  )
}

const Countries = ({countries, filter}) => {
  console.log(countries.length)
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

      </div>
    )
  }

  // 2-10 maata listattuna
  else {
    return (
    <div>
      {countries.map(c =>
          <Country key={c.name} name={c.name}/>)}
    </div>
    )
  }
}

export default Countries