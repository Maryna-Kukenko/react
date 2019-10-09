import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup } from "react-bootstrap";

const Categories = props => (
  <Link to={`/${props.name}`}>
    <ListGroup.Item as='li' onClick = {() => props.selectedCategory(props.name)}>
      {props.name}
      {console.log(props)}
    </ListGroup.Item>
  </Link>
)

export default Categories