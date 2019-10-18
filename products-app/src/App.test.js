import React from 'react';
import ReactDOM from 'react-dom';
import { Router} from 'react-router';
import { Provider } from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import  {shallow}  from 'enzyme';

import reducers  from './ducks/products';
import { App } from './App';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const rootReducers = combineReducers({reducers});

const store = createStore(
  rootReducers,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Should render App component and match to snapshot', () => {
    const rendered = shallow(<Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>);
    expect(rendered).toMatchSnapshot();
  }
);