import React from 'react'
import { ListGroup } from 'react-bootstrap';
import ProductsListItem from '../ProductListItem';

const ProductsList = props => {
  const { searchValue, searchCategory, list } = props;
  const { location: { pathname, search } } = props;
  const filteredProducts = list.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
  const filteredCategoryProducts = filteredProducts.filter(item => item['bsr_category'].toLowerCase() === searchCategory.toLowerCase());
  console.log(props)
  return (
    <ListGroup>
      {pathname == '/' && !search?
        list.map((item, index) => (
          <ProductsListItem
          title={item.name}
          photo={item.img}
          price={item.price}
          key={index}/>
        )):pathname == '/' && search?
          filteredProducts.map((item, index) => (
            <ProductsListItem
              title={item.name}
              photo={item.img}
              price={item.price}
              key={index}/>
          )):
          filteredCategoryProducts.map((item, index) => (
            <ProductsListItem
              title={item.name}
              photo={item.img}
              price={item.price}
              key={index}/>
          ))
      }
    </ListGroup>
  )
};

export default ProductsList;