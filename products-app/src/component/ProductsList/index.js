import React from 'react'
import { ListGroup } from 'react-bootstrap';
import ProductsListItem from '../ProductListItem';

const ProductsList = props => {
  return (
    <ListGroup>
      {props.list.map((item, index) => (
        <ProductsListItem
          title={item.name}
          photo={item.img}
          price={item.price}
          key={index}/>
      ))}
    </ListGroup>
  )
};

export default ProductsList;