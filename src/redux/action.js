export const GET_DATA = 'GET_DATA'
export const ASYNC_GET_DATA = 'ASYNC_GET_DATA'
export const ASYNC_GET_LOCATION = 'ASYNC_GET_LOCATION'
export const ERROR_GET_DATA = 'ERROR_GET_DATA'

export const getDataAction = (payload) => {
  return {
    type: 'GET_DATA',
    payload
  }
}

export const asyncGetDataAction = (payload) => {
  return {
    type: 'ASYNC_GET_DATA',
    payload
  }
}

export const asyncGetLocation = (payload) => {
  return {
    type: 'ASYNC_GET_LOCATION',
    payload
  }
}

export const errorGetDataAction = (payload) => {
  return{
    type: 'ERROR_GET_DATA',
    payload
  }
}