import React, {Component} from "react";
import {Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import {Link} from "react-router-dom";

class InputValue extends Component {
  render() {
    const {findProduct, value, category, showProduct } = this.props
    return (
        <Row>
          <Col lg={{span: 7, offset: 4}}>
            <InputGroup className="mb-3">
              <FormControl
                  placeholder="Search the product"
                  aria-label="Search the product"
                  aria-describedby="basic-addon2"
                  onChange={findProduct}
                  value={value}
                  category={category}
              />
              <InputGroup.Append>
                {/*<Link to={`/${props.category}/${props.value}`}><Button*/}
                <Link to={`/${category}/${value}`}><Button
                    variant="outline-secondary"
                    onClick={showProduct}
                >Find</Button>
                </Link>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
    )
  }


}

export default InputValue