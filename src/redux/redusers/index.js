const initialState = []

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_DATA':
      return action.payload


    case 'ERROR_GET_DATA':
      return action.payload

    default:
      return state
  }
}
