import * as Types from './actionTypes'

const store = {
  products: [],
  categories: []
};

const reducers = (state = [], action) => {
  switch (action.type) {
    case Types.GET_PRODUCTS:
      return [
        ...state,
        action.payload
        ];
    case Types.GET_CATEGORIES:
      return [
        ...state,
        action.payload
      ];
    default: {
      return state
    }
  }
};

export default reducers;