import {call, put} from "@redux-saga/core/effects";
import axios from 'axios';

export default function* addData() {
  let productList = yield call( axios.get, 'http://demo9165932.mockable.io/products')
  yield put()
}