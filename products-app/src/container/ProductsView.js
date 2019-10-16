import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux'
import {Col, ListGroup, ListGroupItem, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {addCategory, addSearchValue, addToStore} from '../ducks/products';
import InputValue from '../component/Search';
import Categories from '../component/Categories';
import ProductsList from '../component/ProductsList';

class ProductsView extends Component{
  state = {
    filterValue:'',
    category: ''
  };

  componentDidMount() {
    //fetch data using saga
    this.props.addElementToStore();

    //save data after refreshing
    this.checkRefreshedData();
  }

  //save search value from input
  handleInputValue = e => this.setState({filterValue: e.target.value});

  selectedCategory = category => {
    this.setState({category});
  };

  checkRefreshedData = () => {
    const { location: { pathname, search } } = this.props;
    const {filterValue, category} = this.state;

    if ((pathname || search) && !filterValue && !category) {
      let word = search ? search.split('?search=')[1] : '';
      let category = pathname ? pathname.split('/')[1] : '';
      this.setState({
        filterValue: word,
        category: category
      })
    }
  }


  render() {
    const { filterValue, category} = this.state;
    const { handleInputValue, selectedCategory } = this;
    return (
      <>
        <Row>
          <Col lg={{span: 7, offset: 4}}>
            <InputValue
              findProduct={handleInputValue}
              value={filterValue}
              category={category}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={{span: 3, offset: 1}}>
            <ListGroup as='ul'>
              <Link to='/'>
                <ListGroupItem onClick={() => selectedCategory('')}>
                  All Categories
                </ListGroupItem>
              </Link>
              {this.props.categories.map((item, index) => (
                <Categories
                  name={item}
                  key={index}
                  selectedCategory={selectedCategory}
                  category={category}
                />
              ))}
            </ListGroup>
          </Col>
          <Col lg={7}>
            <Switch>
              <Route path='/:name' component={props =>
                <ProductsList
                  searchValue={filterValue}
                  searchCategory={category}
                  list={this.props.products} {...props} />
              }/>
              <Route exact path='/' component={props =>
                <ProductsList
                  searchValue={filterValue}
                  searchCategory={category}
                  list = {this.props.products} {...props}/>
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
  categories: state.reducers.categories
});

const mapDispatchToProps = dispatch => ({
  addElementToStore: () => dispatch(addToStore()),
  addCategoryToStore: () => dispatch(addCategory()),
  addSearchValueToStore: () => dispatch(addSearchValue())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsView))