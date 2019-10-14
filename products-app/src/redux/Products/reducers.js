import * as Types from './actionTypes'

const store = {
  products: [],
  categories: []
};

const reducers = (state = store, action) => {
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