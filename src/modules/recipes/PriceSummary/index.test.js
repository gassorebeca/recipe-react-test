import React from 'react';
import PriceSummary from './index';
import {render} from '@testing-library/react'

describe('PriceSummary', () => {
  const summaryMock = [
    {
      recipeId: "recipeIdMock",
      name: "Recipe Name Mock",
      price: 1798
    }
  ];
  const totalPriceMock = 1798;
  const shippingPriceMock = 3798;

  it("Style", () => {
    const screen = render(
      <PriceSummary
        summary={summaryMock}
        totalPrice={totalPriceMock}
        shippingPrice={shippingPriceMock}
      />)

    const priceSummary = window.expect(screen.getByTitle("priceSummary"));

    priceSummary.toHaveStyle(`padding: 16px`);
    priceSummary.toHaveStyle(`font-size: 16px`);
    priceSummary.toHaveStyle(`line-height: 27px`);
  });

  it("Should show message when summary is empty", () => {
    const screen = render(
      <PriceSummary
        summary={[]}
        totalPrice={totalPriceMock}
        shippingPrice={shippingPriceMock}
      />)

    window.expect(screen.getByText("No recipes yet :)")).toBeInTheDocument();
  });
});
