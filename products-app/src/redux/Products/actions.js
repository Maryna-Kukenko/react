import * as Types from './actionTypes'

export function addToStore () {
  return({type: Types.GET_DATA})
}

export function getProducts (products) {
  return ({type: Types.GET_PRODUCTS, payload: products})
}

export function getCategories(categories) {
  return ({type: Types.GET_CATEGORIES, payload: categories})
}