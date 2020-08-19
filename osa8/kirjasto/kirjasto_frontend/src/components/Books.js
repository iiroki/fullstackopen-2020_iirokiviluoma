import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const GenreButton = ({ genre, setFilter }) => (
  <button onClick={() => setFilter(genre)}>{genre}</button>
)

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('')
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (
      <div>LOADING BOOKS...</div>
    )
  }

  const allBooks = result.data.allBooks

  const genresCombined = [].concat.apply([], allBooks.map(b => b.genres))
  const genres = [...new Set(genresCombined)]

  const books = genreFilter === ''
    ? allBooks
    : allBooks.filter(b => b.genres.includes(genreFilter))

  return (
    <div>
      <h2>books</h2>

      Filter: {genreFilter} <br/>
      <button onClick={() => setGenreFilter('')}><b>X</b></button>
      {genres.map(g => 
        <GenreButton key={g} genre={g} setFilter={setGenreFilter} />
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books