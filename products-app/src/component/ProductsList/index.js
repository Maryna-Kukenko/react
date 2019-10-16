import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

const ProductsList = props =>  {
    const { createList } = props;
    return (
    <ListGroup>
      { createList(props.products) }
    </ListGroup>
  )
};

const mapStateToProps = state => ({
  products: state.reducers.products,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsList);