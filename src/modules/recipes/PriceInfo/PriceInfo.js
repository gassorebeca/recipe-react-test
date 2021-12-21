import React from 'react';

import IconButton from '../../../components/IconButton';
import IconInfoCircle from '../../../icons/IconInfoCircle';
import Tooltip, { TooltipContainer } from '../../../components/Tooltip';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import PriceSummary from '../PriceSummary';

const PriceInfo = ({ summary, totalPrice, shippingPrice, baseRecipePrice }) => {
  const ref = React.useRef();
  const [isTooltipOpen, setTooltipOpen] = React.useState(false);
  // Close on click outside of the tooltip
  useOnClickOutside(ref, () => setTooltipOpen(false));

  return (
    <TooltipContainer ref={ref}>
      <IconButton onClick={() => setTooltipOpen(!isTooltipOpen)}>
        <IconInfoCircle size="20" />
      </IconButton>
      {isTooltipOpen ? (
        <Tooltip>
          <PriceSummary summary={summary} totalPrice={totalPrice} shippingPrice={shippingPrice} baseRecipePrice={baseRecipePrice} />
        </Tooltip>
      ) : null}
    </TooltipContainer>
  );
};

export default PriceInfo;
