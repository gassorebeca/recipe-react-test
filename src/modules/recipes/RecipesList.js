import React, { useState } from 'react';
import { Row, Col } from '../../components/Grid';
import Flex from '../../components/Flex';
import Box from '../../components/Box';
import RecipeCard from './RecipeCard';
import PriceInfo from './PriceInfo';
import { parseRawPrice } from './price';
import useFetchHelloFreshBox from '../../hooks/useFetchHelloFreshBox';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [summary, setSummary] = useState([]);
  const [selected, setSelected] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedRecipes, setSelectedRecipes] = useState(0);

  const { data, loading } = useFetchHelloFreshBox();
  console.log(recipes);
  const {headline, baseRecipePrice, min, max, shippingPrice} = data;
  const minRecipesSelected = selectedRecipes < min  ? false : true;
  const maxRecipesSelected = selectedRecipes === max ? true : false;
  const totalPriceWithShipping = parseRawPrice(selectedRecipes > 0 ? totalPrice + shippingPrice : 0);

  const handleAddRecipe = (props) => {
    setSummary(summary => [...summary, props] );
    setSelectedRecipes(selectedRecipes + 1);
    setTotalPrice(totalPrice + baseRecipePrice)
    setSelected(selected + 1);

    console.log(recipes);
  };

  const handleRemoveRecipe = (id) => {
    setSummary(summary => summary.splice(id, 1));
    setTotalPrice(totalPrice - baseRecipePrice)
    setSelectedRecipes(selectedRecipes - 1);
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
            <PriceInfo summary={summary} totalPrice={totalPrice} shippingPrice={shippingPrice} baseRecipePrice={baseRecipePrice}/>
          </Flex>
        </Col>
      </Row>

      <Row>
        {recipes.map((recipe) => (
          <Col sm={12} md={6} xl={4} key={recipe.id}>
            <Box mb="md">
              <RecipeCard
                {...recipe}
                selectionLimit={7}
                selected={selected}
                handleAddRecipe={handleAddRecipe}
                handleRemoveRecipe={handleRemoveRecipe}
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
