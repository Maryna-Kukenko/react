import * as Types from './actionTypes'

export default function (state = [], action) {
  switch (action.type) {
    case Types.GET_DATA: {
      return action.payload
    }
    default: {
      return state
    }
  }
}