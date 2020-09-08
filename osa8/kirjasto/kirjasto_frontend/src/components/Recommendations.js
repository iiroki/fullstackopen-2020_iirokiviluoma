import React from 'react'
import { useQuery } from '@apollo/client'

import { FAVORITE_GENRE, ALL_BOOKS_GENRE } from '../queries'

const RecommendedBooks = ({ genre }) => {
  const result = useQuery(ALL_BOOKS_GENRE, {
    variables: { genre: genre }
  })

  if (result.loading) {
    return (
      <div>LOADING RECOMMENDED BOOKS...</div>
    )
  }

  const books = result.data.allBooks

  return (
    <div>
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

const Recommendations = props => {
  const result = useQuery(FAVORITE_GENRE)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (
      <div>LOADING RECOMMENDATIONS...</div>
    )
  }

  const favGenre = result.data.me.favoriteGenre
    ? result.data.me.favoriteGenre
    : 'No favorite genre :('

  return (
    <div>
      <h2>
        Recommendations
      </h2>
      Books in your favorite genre: <b>{favGenre}</b>
      <RecommendedBooks genre={favGenre} />
    </div>
  )
}

export default Recommendations
