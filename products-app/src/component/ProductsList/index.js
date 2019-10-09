import React, { Component } from 'react'
import { ListGroup } from "react-bootstrap";
import ProductsListItem from "../ProductListItem";

class ProductsList extends Component {
  render() {
    const list = this.props.list
    return (
      <ListGroup>
        {this.props.match.params.name === undefined?
          list.map((item, index) => (
            <ProductsListItem
              title={item.name}
              photo={item.img}
              price={item.price}
              key={index}/>)) :
          list.map((item, index) => (
            this.props.match.params.name === item['bsr_category'] ?
              <ProductsListItem
                title={item.name}
                photo={item.img}
                price={item.price}
                key={index}/>
              : null
          ))
        }
      </ListGroup>
    )
  }
}

export default ProductsList