import React from 'react';
import { Container } from 'react-bootstrap';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'

import ProductsView from './container/ProductsView';
import reducers, { getData } from './ducks/products';

const sagaMiddleware = createSagaMiddleware();
const rootReducers = combineReducers({reducers});

export const store = createStore(
  rootReducers,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(getData);

export function App() {
  return (
    <Container>
      <ProductsView />
    </Container>
  );
}