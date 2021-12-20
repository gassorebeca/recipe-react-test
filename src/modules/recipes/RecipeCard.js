import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import css from '@styled-system/css';

import Flex from '../../components/Flex';
import Box from '../../components/Box';
import Text from '../../components/Text';
import Button from '../../components/Button';
import IconMinusCircle from '../../icons/IconMinusCircle';
import IconPlusCircle from '../../icons/IconPlusCircle';
import { parseRawPrice } from './price';

const isButtonDisable = (selectionLimit, maxRecipesSelected) => {
  return maxRecipesSelected ? true : false
};

const onClickAdd = (handleAddRecipe, setSelectedRecipe, selectedRecipe, recipeId, name, price) => {
  setSelectedRecipe(selectedRecipe + 1)
  handleAddRecipe({recipeId, name, price, selectedRecipe})
}

const onClickRemove = (handleRemoveRecipe, setSelectedRecipe, selectedRecipe, name) => {
  setSelectedRecipe(selectedRecipe - 1)
  handleRemoveRecipe(name, selectedRecipe)
}

const RecipeCard = ({
  extraCharge,
  handleAddRecipe,
  handleRemoveRecipe,
  headline,
  id,
  image,
  maxRecipesSelected,
  minRecipesSelected,
  name,
  selected,
  selectionLimit,
  yields,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState(selected);

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
          setSelectedRecipe={setSelectedRecipe}
          selectedRecipe={selectedRecipe}
          name={name}
          yields={yields}
          selected={selected}
          selectionLimit={selectionLimit}
          maxRecipesSelected={maxRecipesSelected}
          handleAddRecipe={handleAddRecipe}
          handleRemoveRecipe={handleRemoveRecipe}
        />
      ) : (
        <UnselectedRecipeFooter
          recipeId={id}
          setSelectedRecipe={setSelectedRecipe}
          selectedRecipe={selectedRecipe}
          name={name}
          price={extraCharge && extraCharge}
          selected={selected}
          minRecipesSelected={minRecipesSelected}
          maxRecipesSelected={maxRecipesSelected}
          handleAddRecipe={handleAddRecipe}
          handleRemoveRecipe={handleRemoveRecipe}
        />
      )}
    </Box>
  );
};

RecipeCard.propTypes = {
  extraCharge: PropTypes.number,
  handleAddRecipe: PropTypes.func,
  handleRemoveRecipe: PropTypes.func,
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
  isExtra,
  name,
  price,
  recipeId,
  minRecipesSelected,
  maxRecipesSelected,
  handleAddRecipe,
  setSelectedRecipe,
  selectedRecipe
}) => (
  <Flex p="xs">
    <Box flex="50%" alignSelf="center">
      {price ? <Text color="primary_600">+{parseRawPrice(price)}</Text> : null}
    </Box>
    <Box flex="50%">
      <Button
        onClick={() => onClickAdd(handleAddRecipe, setSelectedRecipe, selectedRecipe, recipeId, name, price)}
        variant="secondary"
        width="100%"
        p="0"
        disabled={maxRecipesSelected ? true : false}>
        {false ? 'Add extra meal' : 'Add'}
      </Button>
    </Box>
  </Flex>
);

UnselectedRecipeFooter.propTypes = {
  isExtra: PropTypes.bool,
  price: PropTypes.number,
  recipeId: PropTypes.string,
  minRecipesSelected: PropTypes.bool,
  maxRecipesSelected: PropTypes.bool,
  handleAddRecipe: PropTypes.func,
};

const SelectedRecipeFooter = ({
  recipeId,
  name,
  selected,
  selectionLimit,
  yields,
  maxRecipesSelected,
  handleAddRecipe,
  handleRemoveRecipe,
  price,
  setSelectedRecipe,
  selectedRecipe
}) => (
  <Flex backgroundColor="primary_600" justifyContent="space-between" alignItems="center">
    <SelectionButton
      onClick={() => onClickRemove(handleRemoveRecipe, setSelectedRecipe, selectedRecipe, name)}
      title="Decrease quantity">
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
      onClick={() => onClickAdd(handleAddRecipe, setSelectedRecipe, selectedRecipe, recipeId, name, price)}
      title="Increase quantity"
      disabled={isButtonDisable(selectionLimit, maxRecipesSelected)}>
      <IconPlusCircle />
    </SelectionButton>
  </Flex>
);

SelectedRecipeFooter.propTypes = {
  recipeId: PropTypes.string,
  selected: PropTypes.number,
  selectionLimit: PropTypes.number,
  yields: PropTypes.number,
  maxRecipesSelected: PropTypes.bool,
  handleAddRecipe: PropTypes.func,
  handleRemoveRecipe: PropTypes.func,
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
