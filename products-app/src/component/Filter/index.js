import React from "react";
import {Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";

const InputValue = (props) => {
  return (
    <Row>
      <Col lg={{span: 4, offset: 4}}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search the product"
            aria-label="Search the product"
            aria-describedby="basic-addon2"
            onChange={props.findProduct}
          />
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={props.showProduct}
            >Find</Button>
          </InputGroup.Append>
        </InputGroup>
      </Col>
    </Row>
  )
}

export default InputValue