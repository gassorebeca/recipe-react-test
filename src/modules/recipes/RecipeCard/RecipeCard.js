import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import css from '@styled-system/css';

import Flex from '../../../components/Flex';
import Box from '../../../components/Box';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import IconMinusCircle from '../../../icons/IconMinusCircle';
import IconPlusCircle from '../../../icons/IconPlusCircle';
import { parseRawPrice } from '../Price/price';

const isButtonDisable = (selectionLimit, maxRecipesSelected, selectedRecipe) => {
  // selectedRecipe
  if(selectedRecipe >= selectionLimit) return true;

  // if maxRecipesSelected  is true, the button is disabled
  return maxRecipesSelected ? true : false;
};

const summaryItemName = (selectedRecipeCount, name) => {
  return selectedRecipeCount > 1 ? name + " x " + selectedRecipeCount : name;
}

// price multiplied by the amount of times this recipe was selected
const summaryItemPrice = (price, selectedRecipeCount, baseRecipePrice) => {
  if(price !== 0) return price * selectedRecipeCount;

  return baseRecipePrice * selectedRecipeCount;
}

const onClickAdd = (handleAddRecipe, handleUpdateRecipe, setSelectedRecipe, selectedRecipe, recipeId, name, price, baseRecipePrice) => {
  // count how many times this recipe was added to the summary box
  let selectedRecipeCount = selectedRecipe + 1;
  setSelectedRecipe(selectedRecipeCount);

  // build new summary item to be send to recipesList
  const newSummaryItem = {
    recipeId,
    name: summaryItemName(selectedRecipeCount, name),
    price: summaryItemPrice(price, selectedRecipeCount, baseRecipePrice)
  }

  // if selectedRecipeCount is smaller or equal to 1 add new summary
  if(selectedRecipeCount <= 1)
    handleAddRecipe(newSummaryItem);
  // if recipe is already in the summary box, update the summary item
  else handleUpdateRecipe(newSummaryItem);
};

const RecipeCard = ({
  extraCharge,
  baseRecipePrice,
  handleAddRecipe,
  handleRemoveRecipe,
  handleUpdateRecipe,
  headline,
  id,
  image,
  maxRecipesSelected,
  minRecipesSelected,
  name,
  selected,
  selectionLimit,
  yields,
  price,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState(0);
  const [isRecipeDuplicated, setIsRecipeDuplicated] = useState(false);

  return (
    <Box
      borderWidth={selected ? 'md' : null}
      borderStyle={selected ? 'solid' : null}
      borderColor={selected ? 'primary_600' : null}
      m={selected ? '-2px' : null}
      borderRadius="md"
      boxShadow="lg">
      <Box borderRadius="2px 2px 0px 0px" paddingBottom="56.25%" overflow="hidden" height="0">
        <img src={image} alt={name} width="100%" />
      </Box>

      <Box p="xs" height="120px">
        <Text fontWeight="bold" fontFamily="primary" fontSize="md">
          {name}
        </Text>
        <Text fontWeight="regular" fontFamily="secondary" fontSize="sm">
          {headline}
        </Text>
      </Box>
      {selectedRecipe ? (
        <SelectedRecipeFooter
          recipeId={id}
          baseRecipePrice={baseRecipePrice}
          setSelectedRecipe={setSelectedRecipe}
          selectedRecipe={selectedRecipe}
          name={name}
          yields={yields}
          selected={selected}
          selectionLimit={selectionLimit}
          maxRecipesSelected={maxRecipesSelected}
          handleAddRecipe={handleAddRecipe}
          handleUpdateRecipe={handleUpdateRecipe}
          handleRemoveRecipe={handleRemoveRecipe}
          isRecipeDuplicated={isRecipeDuplicated}
          setIsRecipeDuplicated={setIsRecipeDuplicated}
          price={price}
        />
      ) : (
        <UnselectedRecipeFooter
          recipeId={id}
          baseRecipePrice={baseRecipePrice}
          setSelectedRecipe={setSelectedRecipe}
          selectedRecipe={selectedRecipe}
          name={name}
          price={extraCharge && extraCharge}
          selected={selected}
          minRecipesSelected={minRecipesSelected}
          maxRecipesSelected={maxRecipesSelected}
          handleAddRecipe={handleAddRecipe}
          handleUpdateRecipe={handleUpdateRecipe}
          handleRemoveRecipe={handleRemoveRecipe}
          isRecipeDuplicated={isRecipeDuplicated}
          setIsRecipeDuplicated={setIsRecipeDuplicated}
          selectionLimit={selectionLimit}
        />
      )}
    </Box>
  );
};

RecipeCard.propTypes = {
  extraCharge: PropTypes.number,
  handleAddRecipe: PropTypes.func,
  handleRemoveRecipe: PropTypes.func,
  handleUpdateRecipe: PropTypes.func,
  headline: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  maxRecipesSelected: PropTypes.bool,
  minRecipesSelected: PropTypes.bool,
  name: PropTypes.string,
  selected: PropTypes.number,
  selectionLimit: PropTypes.number,
  yields: PropTypes.number,
};

const UnselectedRecipeFooter = ({
  name,
  slug,
  price,
  recipeId,
  minRecipesSelected,
  maxRecipesSelected,
  handleAddRecipe,
  handleUpdateRecipe,
  setSelectedRecipe,
  selectedRecipe,
  baseRecipePrice,
  selectionLimit
}) => (
  <Flex p="xs">
    <Box flex="50%" alignSelf="center">
      {price ? <Text color="primary_600">+{parseRawPrice(price)}</Text> : null}
    </Box>
    <Box flex="50%">
      <Button
        onClick={() => onClickAdd(handleAddRecipe, handleUpdateRecipe, setSelectedRecipe, selectedRecipe, recipeId, name, price, baseRecipePrice)}
        name={slug}
        variant="secondary"
        width="100%"
        p="0"
        disabled={isButtonDisable(selectionLimit, maxRecipesSelected, selectedRecipe)}>
        {minRecipesSelected ? 'Add extra meal' : 'Add'}
      </Button>
    </Box>
  </Flex>
);

UnselectedRecipeFooter.propTypes = {
  name: PropTypes.string,
  slug: PropTypes.string,
  recipeId: PropTypes.string,
  price: PropTypes.number,
  selectedRecipe: PropTypes.number,
  baseRecipePrice: PropTypes.number,
  selectionLimit: PropTypes.number,
  minRecipesSelected: PropTypes.bool,
  maxRecipesSelected: PropTypes.bool,
  handleAddRecipe: PropTypes.func,
  handleUpdateRecipe: PropTypes.func,
  setSelectedRecipe: PropTypes.func,
};

const SelectedRecipeFooter = ({
  recipeId,
  baseRecipePrice,
  name,
  slug,
  selectionLimit,
  yields,
  maxRecipesSelected,
  handleAddRecipe,
  handleUpdateRecipe,
  handleRemoveRecipe,
  price,
  setSelectedRecipe,
  selectedRecipe,
  setIsRecipeDuplicated,
  isRecipeDuplicated
}) => {
  const onClickRemove = () => {
    let selectedRecipeCount = selectedRecipe - 1;
    setSelectedRecipe(selectedRecipeCount);
    if(selectedRecipe === 1) setIsRecipeDuplicated(false);

    console.log("selectedRecipe",selectedRecipeCount);
    // if selectedRecipeCount is smaller or equal to 1 remove summary with recipeId
    if(selectedRecipeCount <= 1)
      handleRemoveRecipe(recipeId);

    handleRemoveRecipe();
    // if recipe is duplicated, update the summary item
   /* else {
      const updatedSummary = {
        recipeId,
        name: summaryItemName(selectedRecipe, name),
        price: summaryItemPrice(price, selectedRecipe, baseRecipePrice)
      }

      handleUpdateRecipe(updatedSummary);
    } */
  };

  return (
    <Flex backgroundColor="primary_600" justifyContent="space-between" alignItems="center">
      <SelectionButton
        id={slug}
        onClick={onClickRemove}
        title="Decrease quantity"
      >
        <IconMinusCircle />
      </SelectionButton>
      <Box color="white">
        <Text textAlign="center" fontWeight="bold" fontFamily="secondary" fontSize="md">
          {selectedRecipe} in your box
        </Text>
        <Text textAlign="center" fontFamily="secondary" fontSize="sm">
          ({selectedRecipe * yields} servings)
        </Text>
      </Box>
      <SelectionButton
        onClick={() => onClickAdd(handleAddRecipe,handleUpdateRecipe, setSelectedRecipe, selectedRecipe, recipeId, name, price, isRecipeDuplicated, baseRecipePrice)}
        title="Increase quantity"
        name={slug}
        disabled={isButtonDisable(selectionLimit, maxRecipesSelected, selectedRecipe)}>
        <IconPlusCircle />
      </SelectionButton>
    </Flex>
  );
};

SelectedRecipeFooter.propTypes = {
  recipeId: PropTypes.string,
  name: PropTypes.string,
  slug: PropTypes.string,
  yields: PropTypes.number,
  price: PropTypes.number,
  baseRecipePrice: PropTypes.number,
  selectionLimit: PropTypes.number,
  selectedRecipe: PropTypes.number,
  handleAddRecipe: PropTypes.func,
  handleUpdateRecipe: PropTypes.func,
  handleRemoveRecipe: PropTypes.func,
  setSelectedRecipe: PropTypes.func,
  setIsRecipeDuplicated: PropTypes.func,
  isRecipeDuplicated: PropTypes.bool,
  maxRecipesSelected: PropTypes.bool,

};

const SelectionButton = styled.button`
  ${css({
    outline: 'none',
    color: 'white',
    padding: 'sm',
    cursor: 'pointer',
    backgroundColor: 'primary_600',
    border: 'none',
    ':hover:enabled': {
      backgroundColor: 'primary_700',
    },
    ':active:enabled': {
      backgroundColor: 'primary_800',
    },
  })}
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

export default RecipeCard;
