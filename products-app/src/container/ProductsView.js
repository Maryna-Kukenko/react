import React, { Component } from 'react';
import fetchProducts from "../api/fetchProducts";
import {Col, ListGroup, Row} from "react-bootstrap";
import InputValue from "../component/Filter";
import Categories from "../component/Categories";
import {Route, Switch} from "react-router";
import DefaultView from "../component/DefaultView";
import Products from "../component/Products";

class ProductsView extends Component{
  state = {
    productList: [],
    categoryList: [],
    filterValue: ''
  }

  componentDidMount() {
    fetchProducts().then(res => {
      this.setState({
        productList: res.products,
      })
      let categoryArr = []
      res.products.map(item => {
        categoryArr.push(item['bsr_category'])
        return this.selectUniqueProducts(categoryArr)
      })
    })
  }

  selectUniqueProducts = data => {
    let unique = []

    for (let item of data){
      if (!unique.includes(item)){
        unique.push(item)
      }
    }

    return this.setState({
      categoryList: unique
    })
  }

  findProduct = e => {
    this.setState({
      filterValue: e.target.value
    })
  }

  showFilteredProduct = () => {
    let filterdArr = this.state.productList.filter(item => {
      return item.name.includes(this.state.filterValue)
    })
    this.setState({
      productList: filterdArr
    })
  }
  render() {
    const categoryList = this.state.categoryList
    const { children } = this.props;
    return (
      <>
        <InputValue
          findProduct={this.findProduct}
          showProduct={this.showFilteredProduct}
        />
        <Row>
          <Col lg={{span: 3, offset: 1}}>
            <ListGroup as='ul'>
              {categoryList.map( (item, index) => {
                return <Categories
                  name = {item}
                  key = {index}
                  {...this.props}
                />
              })}
            </ListGroup>
          </Col>
          <Col lg={7}>
            <Switch>
              <Route exact path='/' component={DefaultView} />
              <Route exact path='/:name' component={Products}/>
          </Switch>
          </Col>
        </Row>
      </>
    )
  }
}

export default ProductsView