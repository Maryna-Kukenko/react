import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { InputGroup, FormControl } from 'react-bootstrap';

class InputValue extends Component {
  render() {
    const { findProduct, value, category, location, history } = this.props;
    return (
      <InputGroup className='mb-3'>
        <FormControl
          placeholder='Search the product'
          aria-label='Search the product'
          aria-describedby='basic-addon2'
          onChange={ e => {
            (e.target.value)?
              history.push(`${location.pathname}?search=${e.target.value}`)
              :history.push(`${location.pathname}`);
            findProduct (e);
          }}
          value={value}
          category={category}
        />
      </InputGroup>
    )
  }
}

export default withRouter(InputValue)