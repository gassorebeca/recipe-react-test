import React from 'react';
import Box from '../../components/Box';
import { Row, Col } from '../../components/Grid';
import { parseRawPrice } from './price';

const PriceSummary = ({ summary, totalPrice, shippingPrice, baseRecipePrice }) => {
  return (
    <Box width={['290px', '450px']} padding={"16px"}  fontSize={"16px"} lineHeight={"27px"} >
      {summary.length !== 0 ? summary.map((recipe) => (
        <Box key={recipe.id} fontWeight={400} paddingBottom={"8px"}>
          <Row>
            <Col sm={10}>
              {recipe.name}
            </Col>
            <Col sm={2}>
              {parseRawPrice(baseRecipePrice)}
            </Col>
          </Row>
        </Box>
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
      <Box borderTop={"solid 1px #E4E4E4"} paddingBottom={"8px"}>
      </Box>
      <Box fontWeight={600}>
        <Row>
          <Col sm={10}>Total</Col>
          <Col sm={2}>{parseRawPrice(totalPrice + shippingPrice)}</Col>
        </Row>
      </Box>
    </Box>
  );
};

export default PriceSummary;
