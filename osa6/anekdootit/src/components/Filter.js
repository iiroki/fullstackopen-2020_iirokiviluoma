import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, resetFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  const style = {
    marginTop: 5,
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter: <input onChange={handleChange} value={filter} />
      <button onClick={() => dispatch(resetFilter())}>X</button>
    </div>
  )
}

export default Filter
