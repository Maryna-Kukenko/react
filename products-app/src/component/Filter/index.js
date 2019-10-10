import React, {Component} from "react";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import { withRouter } from "react-router";

class InputValue extends Component {
  render() {
    const {findProduct, showProducts, value, category, location, history } = this.props;
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
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    location.pathname === '/'?
                    history.push(location.pathname + value):
                      history.push(`${location.pathname}/` + value);
                    showProducts()
                  }}
                >Find</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
    )
  }
}

export default withRouter(InputValue)