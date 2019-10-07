import React, { Component } from "react";
import { Container } from "react-bootstrap";
import ProductsView from "../container/ProductsView";
import {Route} from "react-router";
import DefaultView from "../component/DefaultView";

class Layout extends Component{
  render() {
    return (
      <Container>
        <ProductsView {...this.props} />
      </Container>
    )
  }
}

export default Layout