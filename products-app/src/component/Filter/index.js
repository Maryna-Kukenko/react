import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import {Link} from "react-router-dom";

class InputValue extends Component {
  render() {
    const { findProduct, showProducts, value, category, location, history } = this.props;
    return (
      <InputGroup className='mb-3'>
        <FormControl
          placeholder='Search the product'
          aria-label='Search the product'
          aria-describedby='basic-addon2'
          onChange={findProduct}
          value={value}
          category={category}
        />
        <InputGroup.Append>
          {/*<Link to={location.pathname}>*/}
          <Button
            variant='outline-secondary'
            onClick={() => {
              location.pathname === '/'?
                history.push(location.pathname + value):
                history.push(`${location.pathname}/` + value);
              showProducts()
            }}
          >Find</Button>
          {/*</Link>*/}
        </InputGroup.Append>
      </InputGroup>
    )
  }
}

export default withRouter(InputValue)