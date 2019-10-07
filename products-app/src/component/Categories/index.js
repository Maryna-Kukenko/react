import React from 'react'
import { NavLink } from 'react-router-dom'
import { ListGroup } from "react-bootstrap";

const Categories = (props) => (
  <NavLink to={`/${props.name}`}>
    <ListGroup.Item as='li'>
      {props.name}
    </ListGroup.Item>
  </NavLink>
)

export default Categories