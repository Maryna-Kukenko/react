import reducer, {addData, store} from '../products';
import {  addCategory, addSearchValue } from '../products';
import { call } from '@redux-saga/core/effects';
import axios from 'axios';

export const GET_DATA = 'GET_DATA';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_SELECT_CATEGORY = 'GET_SELECT_CATEGORY';
export const GET_SEARCH_VALUE = 'GET_SEARCH_VALUE';

describe('Reducers and Acrions', () => {
  describe('Reducers', () => {
    it('should work GET_PRODUCTS reducer', () => {
      const action = {
        type: GET_PRODUCTS,
        payload: [1, 2, 3]
      };

      expect(reducer(store, action)).toEqual({
        ...store,
        products: action.payload
      })
    });
    it('should work GET_CATEGORIES reducer', function () {
      const  store = {
        products:[1,2,3],
        search: ''
      };
      const action = {
        type: GET_CATEGORIES,
        payload: [1, 2, 3]
      };
      expect(reducer(store, action)).toEqual({
        ...store,
        categories: action.payload
      })
    });
    it('should work GET_SELECT_CATEGORY reducer', function () {
      const action = {
        type: GET_SELECT_CATEGORY,
        payload: 'category'
      };
      expect(reducer(store, action)).toEqual({
        ...store,
        category: action.payload
      })
    });
    it('should work GET_SEARCH_VALUE', () => {
      const action = {
        type: GET_SEARCH_VALUE,
        payload: 'searchValue'
      };
      expect(reducer(store, action)).toEqual({
        ...store,
        search: action.payload
      })
    })
  });
  describe('Actions', () => {
    it('should saga works', () => {
      const generator = addData();
        expect(generator.next().value).toEqual(call(axios.get, '/products/products.json'))
      });

    it('should work action that add category into redux', function () {
      const expectedAction = {
        type: GET_SELECT_CATEGORY,
        payload: 'selectedCategory'
      };
      expect(addCategory('selectedCategory')).toEqual(expectedAction)
    });
    it('should work action that add search value into redux', function () {
      const expectedAction = {
        type: GET_SEARCH_VALUE,
        payload: 'searchValue'
      };
      expect(addSearchValue('searchValue')).toEqual(expectedAction)
    });
  })
});