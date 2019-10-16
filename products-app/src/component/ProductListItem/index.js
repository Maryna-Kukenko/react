import React from 'react';
import styled from 'styled-components'
import {CardImg, ListGroupItem} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/Card';
import CardText from 'react-bootstrap/Card';

const ProductsListItem = props => {
  return (
    <StyledListGroupItem>
      <StyledCard>
        <StyledCardImg src={props.photo}/>
        <StyledCardBody>
          <Card.Title>{props.title}</Card.Title>
          <StyledCardText>{`Price: ${props.price}`}</StyledCardText>
        </StyledCardBody>
      </StyledCard>
    </StyledListGroupItem>
  )
};

export default ProductsListItem

const StyledCardImg = styled(CardImg)`
  width: 30%;
`;
const StyledCard = styled(Card)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: none;
`;
const StyledCardBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 65%;
  border: none;
`;
const StyledCardText = styled(CardText)`
  display: flex;
  align-items: flex-end;
  border: none;
`;

const StyledListGroupItem = styled(ListGroupItem)`
  margin-bottom: 10px;
`;