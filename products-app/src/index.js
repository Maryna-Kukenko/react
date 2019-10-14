import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import store from "./redux";

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App} />
    </Router>
  </Provider>,
  document.getElementById('root'));