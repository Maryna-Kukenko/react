import React from 'react';
import Layout from "./hoc";
import {Route, Switch} from "react-router";
import Products from "./component/Products";
import DefaultView from "./component/DefaultView";
import {Col} from "react-bootstrap";

function App() {
  return (
      <Layout>
        <Switch>
          <Route exact path='/' component={DefaultView} />
          <Route exact path='/:name' render={() => <h1>Hello</h1>} />
          <Route render={() => <h1 style={{color: 'red', textAlign: 'center'}}> 404 not found </h1>} />
        </Switch>
      </Layout>
  );
}

export default App;