import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux'
import {Col, ListGroup, ListGroupItem, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {addCategory, addSearchValue, addToStore} from '../ducks/products';
import InputValue from '../component/Search';
import Categories from '../component/Categories';
import ProductsList from '../component/ProductsList';
import ProductsListItem from "../component/ProductListItem";

class ProductsView extends Component{
 state = {
   inputValue: ''
 };

  componentDidMount() {
    //fetch data using saga
    this.props.addElementToStore();

    //save data after refreshing
    this.saveRefreshedData();
  }

  //save search value from input
  handleInputValue = e => {
    this.props.addSearchValueToStore(e.target.value)
  };

  selectedCategory = category => {
    this.props.addCategoryToStore(category);
    this.props.addSearchValueToStore('')
  };


  saveRefreshedData = () => {
    const { location: { pathname, search }, selectCategory, searchValue } = this.props;

    if ((pathname || search) && !searchValue && !selectCategory) {
      let word = search ? search.split('?search=')[1] : '';
      let category = pathname ? pathname.split('/')[1] : '';
      this.props.addSearchValueToStore(word);
      this.props.addCategoryToStore(category);
    }
  };

  createProductList = (list) => {
    return list.map((item, index) => (
      <ProductsListItem
        title={item.name}
        photo={item.img}
        price={item.price}
        key={index}/>
    ))
  };

  render() {
    const { products, categories, selectCategory, searchValue } =this.props;
    const { createProductList, handleInputValue, selectedCategory } = this;
    return (
      <>
        <Row>
          <Col lg={{span: 7, offset: 4}}>
            <InputValue
              findProduct={handleInputValue}
              value={searchValue}
              category={selectCategory}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={{span: 3, offset: 1}}>
            <ListGroup as='ul'>
              <Link to='/'>
                <ListGroupItem onClick={() => selectedCategory('all Categories')}>
                  All Categories
                </ListGroupItem>
              </Link>
              {categories.map((item, index) => (
                <Categories
                  name={item}
                  key={index}
                  selectedCategory={selectedCategory}
                />
              ))}
            </ListGroup>
          </Col>
          <Col lg={7}>
            <Switch>
              <Route path='/:name' component={props =>
                <ProductsList
                  // searchValue={searchValue}
                  // searchCategory={selectCategory}
                  // list={products}
                  createList={createProductList}
                  {...props}
                />
              }/>
              <Route exact path='/' component={props =>
                <ProductsList
                  // searchValue={searchValue}
                  // searchCategory={selectCategory}
                  // list = {products}
                  createList={createProductList}
                  {...props}
                />
              }/>
            </Switch>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = state => ({
  products: state.reducers.products,
  categories: state.reducers.categories,
  selectCategory: state.reducers.category,
  searchValue: state.reducers.search
});

const mapDispatchToProps = dispatch => ({
  addElementToStore: () => dispatch(addToStore()),
  addCategoryToStore: (e) => dispatch(addCategory(e)),
  addSearchValueToStore: (e) => dispatch(addSearchValue(e))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsView))