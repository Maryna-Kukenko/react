import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

const ProductsList = props =>  {
    const { searchValue, selectCategory, products, createList } = props;
    const { location: { pathname, search }} = props;
    const filteredProducts = products.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
    const filteredCategoryProducts = filteredProducts.filter(item => item['bsr_category'].toLowerCase() === selectCategory.toLowerCase());
    return (
    <ListGroup>
      {
        pathname === '/' && !search? createList(products)
          :pathname === '/' && search? createList(filteredProducts)
          :createList(filteredCategoryProducts)
      }
    </ListGroup>
  )
}


const mapStateToProps = state => ({
  products: state.reducers.products,
  categories: state.reducers.categories,
  selectCategory: state.reducers.category,
  searchValue: state.reducers.search
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsList);