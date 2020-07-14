const filterAtStart = ''

const filterReducer = (state = filterAtStart, action) => {
  switch (action.type) {
    case('SET_FILTER'):
      return action.data.filter
    
    case('RESET_FILTER'):
      return filterAtStart

    default:
      return state
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    data: {
      filter: filter
    }
  }
}

export const resetFilter = () => {
  return {
    type: 'RESET_FILTER'
  }
}

export default filterReducer
