import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux'
import { Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { addCategory, addSearchValue, addToStore } from '../ducks/products';
import InputValue from '../component/Search';
import Categories from '../component/Categories';
import ProductsList from '../component/ProductsList';
import ProductsListItem from '../component/ProductListItem';

class ProductsView extends Component{

  componentDidMount() {
    //fetch data using saga
    this.props.addElementToStore();

    //save data after refreshing
    this.saveRefreshedData();
  }

  showCategoryList = (data) => {
    return data.map((item, index) => (
      <Categories
        name={item}
        key={index}
        selectedCategory={this.selectedCategory}
      />
    ))
  };

  //save search value from input
  handleInputValue = e => {
    this.props.addSearchValueToStore(e.target.value)
  };

  selectedCategory = category => {
    this.props.addCategoryToStore(category);
    this.props.addSearchValueToStore('')
  };

  saveRefreshedData = () => {
    const { location: { pathname, search }, selectCategory, searchValue, addSearchValueToStore, addCategoryToStore } = this.props;

    if ((pathname || search) && !searchValue && !selectCategory) {
      let word = search ? search.split('?search=')[1] : '';
      let category = pathname ? pathname.split('/')[1] : '';
      addSearchValueToStore(word);
      addCategoryToStore(category);
    }
  };

  //show products depends on request
  showProductList = list => {
    const { location: { pathname, search }} = this.props;
    const {createProductList, searchCategoryProducts, searchProducts } = this;
    return pathname === '/' && !search? createProductList(list)
      :pathname === '/' && search? searchProducts(list)
        :searchCategoryProducts(list)
  };

  createProductList = list => {
    return list.map((item, index) => (
      <ProductsListItem
        title={item.name}
        photo={item.img}
        price={item.price}
        key={index}/>
    ))
  };

  //filter products by name in current category
  searchCategoryProducts = list => {
    let filteredCategory = list.filter(item => item['bsr_category'].toLowerCase() === this.props.selectCategory.toLowerCase());
    return this.searchProducts(filteredCategory)
  };

  //filter products by name
  searchProducts = list => {
    let findCategory = list.filter(item => item.name.toLowerCase().includes(this.props.searchValue.toLowerCase()));
    return this.createProductList(findCategory)
  };

  render() {
    console.log(this.props.searchValue);
    const { categories, selectCategory, searchValue } = this.props;
    const { showCategoryList, showProductList, handleInputValue, selectedCategory } = this;
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
                <ListGroupItem onClick={() => selectedCategory('All categories')}>
                  All Categories
                </ListGroupItem>
              </Link>
              {showCategoryList(categories)}
            </ListGroup>
          </Col>
          <Col lg={7}>
            <Switch>
              <Route path='/:name' component={props =>
                <ProductsList
                  createList={showProductList}
                  {...props}
                />
              }/>
              <Route exact path='/' component={props =>
                <ProductsList
                  createList={showProductList}
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