import React, { Component } from 'react'
import { ListGroup } from "react-bootstrap";
import ProductsListItem from "../ProductListItem";

class FilteredList extends Component {
  render() {
    console.log('filtered list' + this.props.match.params.name)
    console.log('filtered list' + this.props.list)
    return (
      <ListGroup>
        {this.props.list.map((item, index) => {
          return item['bsr_category'] === this.props.match.params.name? <ProductsListItem title={item.name}
                                 photo={item.img}
                                 price ={item.price}
                                 key={index}/>:null
        })}

      </ListGroup>
    )
  }
}

export default FilteredList