import React from 'react'
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const Categories = props => (
  <Link to={`${props.name}`}>
    <ListGroup.Item as='li' onClick={() => props.selectedCategory(props.name)}>
      {props.name}
    </ListGroup.Item>
  </Link>
);

export default withRouter(Categories);