import React, { Component } from 'react'
import { ListGroup } from "react-bootstrap";
import ProductsListItem from "../ProductListItem";

class ProductsList extends Component {
  render() {
    // console.log(this.props.location.pathname)
    const list = this.props.list
    return (
      <ListGroup>
        {list.map((item, index) => (
              <ProductsListItem
                title={item.name}
                photo={item.img}
                price={item.price}
                key={index}/>
          ))}
      </ListGroup>
    )
  }
}

export default ProductsList