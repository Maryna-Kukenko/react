import React, { Component } from 'react';
import fetchProducts from "../api/fetchProducts";
import { Col, ListGroup, Row } from "react-bootstrap";
import InputValue from "../component/Filter";
import Categories from "../component/Categories";
import {Route, Switch} from "react-router";
import { withRouter } from "react-router";
import ProductsList from "../component/ProductsList";

class ProductsView extends Component{
  state = {
    productList: [],
    categoryList: [],
    filteredList: [],
    filterValue: '',
    category: ''
  };

  componentDidMount() {
    fetchProducts().then(res => {
      this.setState({
        productList: res.products
      });
      let categoryArr = [];
      res.products.map(item => {
        categoryArr.push(item['bsr_category']);
        return this.selectUniqueProducts(categoryArr)
      })
    })
  }

  selectUniqueProducts = data => {
    let unique = [];
    for (let item of data) {
      if (!unique.includes(item)) {
        unique.push(item)
      }
    }
    return this.setState({
      categoryList: unique
    })
  };

  handleInputValue = e => {
    return this.setState({
      filterValue: e.target.value
    })
  };

  showFilteredProducts =() => {
    let filterdArr = this.state.productList.filter(item => {
      return item.name.toLowerCase().includes(this.state.filterValue.toLowerCase())
    });
    console.log('FILTERED FUNCTION');
    console.log(filterdArr);
    return this.setState({
      filteredList: filterdArr,
      filterValue: ''
    })
  };

  selectedCategory = category => {
    this.setState({category})
    this.showCategoryProducts(category)
  };

  showCategoryProducts = (category) => {
    let categoryProductsArr = this.state.productList.filter(item => {
      return item['bsr_category'] === category
    });
    console.log('FILTERED FUNCTION');
    console.log(categoryProductsArr);
    return this.setState({
      filteredList: categoryProductsArr,
      filterValue: ''
    })
  }

  render() {
    const { productList, categoryList, filteredList, filterValue, category} = this.state;
    const { handleInputValue, showFilteredProducts, selectedCategory, showCategoryProducts } = this;
    return (
      <>
        <InputValue
          findProduct={handleInputValue}
          showProducts={showFilteredProducts}
          value={filterValue}
          category={category}
        />
        <Row>
          <Col lg={{span: 3, offset: 1}}>
            <ListGroup as='ul'>
              {categoryList.map( (item, index) => {
                return <Categories
                  name = {item}
                  key = {index}
                  selectedCategory={selectedCategory}
                  showProducts={showCategoryProducts}
                  category = {category}
                />
              })}
            </ListGroup>
          </Col>
          <Col lg={7}>
            <Switch>
              <Route path='/:name/:value' render={props => {
                return <ProductsList list={filteredList} {...props} />
              }} />
              <Route path='/:name' render={props => {
                return <ProductsList list={filteredList} {...props} />
              }} />
              <Route path='/' render={props => {
                return <ProductsList list={productList}{...props} />
              }} />
            </Switch>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(ProductsView)