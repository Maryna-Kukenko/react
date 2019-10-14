import { call, put } from '@redux-saga/core/effects';
import axios from 'axios';
import { getProducts, getCategories } from './actions';

export default function* addData() {
  let productList = yield call(axios.get, 'http://demo9165932.mockable.io/products');
  yield put(getProducts(productList.data.products));
  let categories = [...new Set(productList.data.products.map(product => product['bsr_category']))];
  yield put(getCategories(categories))
}