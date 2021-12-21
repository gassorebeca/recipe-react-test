import React, { useState } from 'react';
import { Row, Col } from '../../../components/Grid';
import Flex from '../../../components/Flex';
import Box from '../../../components/Box';
import RecipeCard from '../RecipeCard/RecipeCard';
import PriceInfo from '../PriceInfo/PriceInfo';
import { parseRawPrice } from '../Price/price';
import useFetchHelloFreshBox from '../../../hooks/useFetchHelloFreshBox';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [summary, setSummary] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [recipesInTheBox, setRecipesInTheBox] = useState(0);

  const { data, loading } = useFetchHelloFreshBox();
  const {headline, baseRecipePrice, min, max, shippingPrice} = data;
  const minRecipesSelected = recipesInTheBox < min  ? false : true;
  const maxRecipesSelected = recipesInTheBox === max ? true : false;
  const totalPriceWithShipping = parseRawPrice(recipesInTheBox > 0 ? totalPrice + shippingPrice : 0);

  const handleAddRecipe = (newSummaryItem) => {
    if(newSummaryItem)
      setSummary(summary => [...summary, newSummaryItem] );

    setRecipesInTheBox(recipesInTheBox + 1);
    setTotalPrice(totalPrice + baseRecipePrice)
  };

  const handleUpdateRecipe = (summaryItem) => {
    setSummary(
      summary.map(item =>
        item.recipeId === summaryItem.recipeId
          ? {...item, ...summaryItem}
          : item
      ))

    setRecipesInTheBox(recipesInTheBox + 1);
    setTotalPrice(totalPrice + baseRecipePrice)
  };

  const handleRemoveRecipe = (recipeId) => {
    if(recipeId)
      setSummary(summary => summary.splice(recipeId, 1));

    setTotalPrice(totalPrice - baseRecipePrice)
    setRecipesInTheBox(recipesInTheBox - 1);
  };

  React.useEffect(() => {
    const { recipes: fetchedRecipes } = data;

    if (fetchedRecipes) {
      setRecipes(fetchedRecipes);
    }
  }, [setRecipes, data]);

  if (loading) {
    return null;
  }

  return (
    <>
      <Row>
        <Col sm={6}>
          <h3>{headline}</h3>
        </Col>
        <Col sm={6}>
          <Flex alignItems="center" justifyContent="flex-end">
            <Box textAlign="right" mr="xs">
              <h3>{totalPriceWithShipping}</h3>
            </Box>
            <PriceInfo
              summary={summary}
              totalPrice={totalPrice}
              shippingPrice={shippingPrice}
              baseRecipePrice={baseRecipePrice}
            />
          </Flex>
        </Col>
      </Row>

      <Row>
        {recipes.map((recipe) => (
          <Col sm={12} md={6} xl={4} key={recipe.id}>
            <Box mb="md">
              <RecipeCard
                {...recipe}
                baseRecipePrice={baseRecipePrice}
                selectionLimit={7}
                selected={0}
                handleAddRecipe={handleAddRecipe}
                handleRemoveRecipe={handleRemoveRecipe}
                handleUpdateRecipe={handleUpdateRecipe}
                minRecipesSelected={minRecipesSelected}
                maxRecipesSelected={maxRecipesSelected}
              />
            </Box>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Recipes;
