import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux'
import { Col, ListGroup, Row } from 'react-bootstrap';

import  { addToStore } from '../redux/Products/actions';
import InputValue from '../component/Filter';
import Categories from '../component/Categories';
import ProductsList from '../component/ProductsList';

class ProductsView extends Component{
  state = {
    filteredList: [],
    filterValue: '',
    category: ''
  };

  componentDidMount() {
    //fetch data using saga
    this.props.addElementToStore();
  }

  //save search value from input
  handleInputValue = e => this.setState({filterValue: e.target.value});

  // separate search from all products and category products
  showFilteredProducts = () => {
    this.state.category === ''?
      this.filterProducts(this.props.products):
      this.filterCategory()
  };

  //search products via name in current category
  filterCategory = () => {
    let filteredCategory = this.props.products.filter(item => item['bsr_category'].toLowerCase() === this.state.category.toLowerCase());
    this.filterProducts(filteredCategory)
  };

  //search products via name
  filterProducts = list => {
    let findProducts = list.filter(item => item.name.toLowerCase().includes(this.state.filterValue.toLowerCase()));
    return this.setState({
      filteredList: findProducts,
      filterValue: ''
    })
  };

  selectedCategory = category => {
    this.setState({category});
    this.showCategoryProducts(category)
  };

  //filter by category
  showCategoryProducts = category => {
    let categoryProductsArr = this.props.products.filter(item => item['bsr_category'] === category);
    return this.setState({
      filteredList: categoryProductsArr,
      filterValue: ''
    })
  };

  render() {
    const { filteredList, filterValue, category} = this.state;
    const { handleInputValue, showFilteredProducts, selectedCategory, showCategoryProducts } = this;
    return (
      <>
        <Row>
          <Col lg={{span: 7, offset: 4}}>
            <InputValue
              findProduct={handleInputValue}
              showProducts={showFilteredProducts}
              value={filterValue}
              category={category}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={{span: 3, offset: 1}}>
            <ListGroup as='ul'>
              {this.props.categories.map((item, index) => {
                return <Categories
                  name={item}
                  key={index}
                  selectedCategory={selectedCategory}
                  showProducts={showCategoryProducts}
                  category={category}
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
                return <ProductsList  list = {this.props.products} {...props}/>
              }} />
            </Switch>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = state => ({
  products: state.reducers.products,
  categories: state.reducers.categories
});

const mapDispatchToProps = dispatch => ({
  addElementToStore: () => dispatch(addToStore())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsView))