import { call, put, takeEvery } from "@redux-saga/core/effects";
import axios from "axios";

//actionTypes
export const GET_DATA = 'GET_DATA';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_SELECT_CATEGORY = 'GET_SELECT_CATEGORY';
export const GET_SEARCH_VALUE = 'GET_SEARCH_VALUE';

const store = {
  products: [],
  categories: [],
  category: '',
  search: ''
};

//Reducer
export default function reducer (state = store, action){
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case GET_SELECT_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    case GET_SEARCH_VALUE:
      return {
        ...state,
        search: action.payload
      };
    default: {
      return state
    }
  }
};

//Saga
export function* addData() {
  let productList = yield call(axios.get, '/products/products.json');
  yield put({type: GET_PRODUCTS, payload: productList.data.products});
  let categories = [...new Set(productList.data.products.map(product => product['bsr_category']))];
  yield put({type: GET_CATEGORIES, payload: categories})
}

export function* getData() {
  yield takeEvery(GET_DATA, addData)
}

export function addToStore () {
  return({type: GET_DATA})
}

export function addCategory(data) {
  return({type: GET_SELECT_CATEGORY, payload: data})
}

export function addSearchValue(data) {
  return({type: GET_SEARCH_VALUE, payload: data})
}

