import React, { Component } from 'react';
import fetchProducts from "../api/fetchProducts";
import {Col, ListGroup, Row} from "react-bootstrap";
import InputValue from "../component/Filter";
import Categories from "../component/Categories";
import {Route, Switch} from "react-router";
import ProductsList from "../component/ProductsList";
import FilteredList from "../component/FilteredList";

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

  findProduct = e => {
    return this.setState({
      filterValue: e.target.value
    })
  };

  showFilteredProduct = () => {
    let filterdArr = this.state.productList.filter(item => {
      return item.name.toLowerCase().includes(this.state.filterValue.toLowerCase())
    });
    return this.setState({
      filteredList: filterdArr,
      filterValue: ''
    })
  };

  selectedCategory = category => {
    return this.setState({category})
};

  render() {
    const {productList, categoryList, filterValue, filteredList,  category} = this.state;
    const {findProduct, showFilteredProduct,selectedCategory} = this;
    return (
      <>
        <InputValue
          findProduct={findProduct}
          showProduct={showFilteredProduct}
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
                  selectedCategory = {selectedCategory}
                  category = {category}
                />
              })}
            </ListGroup>
          </Col>
          <Col lg={7}>
            <Switch>
              <Route exact path='/' render={ props => {
                return <ProductsList list = {productList} filteredList ={filteredList} {...props}/>
              }}/>
              <Route exact path='/:name/:value' render={ props => {
                return <FilteredList list = {filteredList} {...props} />
              }}/>
              <Route exact path='/:name' render={ props => {
                return <ProductsList list = {productList} filteredList ={filteredList} {...props} />
              }}/>
          </Switch>
          </Col>
        </Row>
      </>
    )
  }
}

export default ProductsView