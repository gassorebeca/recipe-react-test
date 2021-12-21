import React from 'react';
import Box from '../../../components/Box';
import { Row, Col } from '../../../components/Grid';
import { parseRawPrice } from '../Price/price';
import PropTypes from 'prop-types';

const PriceSummary = ({ summary, totalPrice, shippingPrice }) => {
  return (
    <Box width={['290px', '450px']} padding={"16px"}  fontSize={"16px"} lineHeight={"27px"} >
      {summary.length !== 0 ? summary.map((recipe) => (
        <div key={recipe.id}>
          <Box fontWeight={400} paddingBottom={"8px"}>
            <Row>
              <Col sm={10}>{recipe.name}</Col>
              <Col sm={2}>{parseRawPrice(recipe.price)}</Col>
            </Row>
          </Box>
        </div>
      )) :
        <p>No recipes yet :)</p>
      }
      <Box paddingBottom={"8px"} fontSize={"16px"} lineHeight={"27px"} fontWeight={400}>
        <Row>
          <Col sm={10}>
            Shipping
          </Col>
          <Col sm={2}>
            {parseRawPrice(shippingPrice)}
          </Col>
        </Row>
      </Box>
      <Box borderTopWidth="sm" borderTopColor="border" borderTopStyle="solid" paddingBottom={"8px"}/>
      <Box fontWeight={600}>
        <Row>
          <Col sm={10}>Total</Col>
          <Col sm={2}>{parseRawPrice(totalPrice + shippingPrice)}</Col>
        </Row>
      </Box>
    </Box>
  );
};

PriceSummary.propTypes = {
  summary: PropTypes.array,
  totalPrice: PropTypes.number,
  shippingPrice: PropTypes.number,
};
export default PriceSummary;
