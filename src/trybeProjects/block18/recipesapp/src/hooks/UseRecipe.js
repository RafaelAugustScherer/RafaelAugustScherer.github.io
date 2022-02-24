import useDrink from './UseDrink';
import useMeal from './UseMeal';

function useRecipe(maxLength) {
  const COMIDAS = 'comidas';

  const {
    fetchMeals,
    fetchMealCategories,
    fetchMealById,
    fetchMealsByIngredient,
    fetchMealsByName,
    fetchMealsByArea,
    fetchMealsByFirstLetter,
  } = useMeal();

  const {
    fetchDrinks,
    fetchDrinkCategories,
    fetchDrinkById,
    fetchDrinksByIngredient,
    fetchDrinksByName,
    fetchDrinksByFirstLetter,
  } = useDrink();

  const fetchRecipes = async (comidasOuBebidas) => {
    const recipes = comidasOuBebidas === COMIDAS
      ? await fetchMeals(maxLength)
      : await fetchDrinks(maxLength);
    return recipes;
  };

  const fetchCategories = async (comidasOuBebidas) => {
    const categories = comidasOuBebidas === COMIDAS
      ? await fetchMealCategories(maxLength)
      : await fetchDrinkCategories(maxLength);
    return categories;
  };

  const fetchRecipeById = async (comidasOuBebidas, id) => {
    const recipes = comidasOuBebidas === COMIDAS
      ? await fetchMealById(id)
      : await fetchDrinkById(id);
    return recipes;
  };

  const fetchRecipesByIngredient = async (comidasOuBebidas, ingredient) => {
    const recipes = comidasOuBebidas === COMIDAS
      ? await fetchMealsByIngredient(ingredient, maxLength)
      : await fetchDrinksByIngredient(ingredient, maxLength);
    return recipes;
  };

  const fetchRecipesByName = async (comidasOuBebidas, name) => {
    const recipes = comidasOuBebidas === COMIDAS
      ? await fetchMealsByName(name)
      : await fetchDrinksByName(name);
    return recipes;
  };

  const fetchRecipesByArea = async (area) => {
    const recipes = await fetchMealsByArea(area, maxLength);
    return recipes;
  };

  const fetchRecipesByFirstLetter = async (comidasOuBebidas, letter) => {
    const recipes = comidasOuBebidas === COMIDAS
      ? await fetchMealsByFirstLetter(letter)
      : await fetchDrinksByFirstLetter(letter);
    return recipes;
  };

  return {
    fetchRecipes,
    fetchCategories,
    fetchRecipeById,
    fetchRecipesByIngredient,
    fetchRecipesByName,
    fetchRecipesByArea,
    fetchRecipesByFirstLetter,
  };
}

export default useRecipe;
