import * as Types from './Products/actionTypes'
import addData from './Products/getDataSaga'
import { takeEvery } from '@redux-saga/core/effects';

export default function* getData() {
  yield takeEvery(Types.GET_DATA, addData)
}