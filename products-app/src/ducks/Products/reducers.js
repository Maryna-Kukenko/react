import * as Types from './actionTypes'

const reducers = (state = {}, action) => {
  switch (action.type) {
    case Types.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case Types.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    default: {
      return state
    }
  }
};

export default reducers;