import * as Types from './actionTypes'

export function getData(data) {
  return ({type: Types.GET_DATA, payload: data})
}