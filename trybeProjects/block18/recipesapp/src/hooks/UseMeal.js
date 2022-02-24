function useMeal() {
  const convertMeal = (meal) => {
    const alcoholicOrNot = '';
    const { idMeal: id, strMeal: name, strMealThumb: image } = meal;
    return { id, name, image, alcoholicOrNot, ...meal };
  };

  const convertMeals = (meals) => (meals ? meals.map((meal) => convertMeal(meal)) : null);

  const fetchMeals = async (maxLength) => {
    let { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=').then((response) => response.json());
    meals = convertMeals(meals);
    return meals.slice(0, maxLength);
  };

  const fetchMealCategories = async (maxLength) => {
    const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list').then((response) => response.json());
    return meals.map(({ strCategory }) => strCategory).slice(0, maxLength);
  };

  const fetchMealById = async (id) => {
    const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) => response.json());
    return convertMeal(meals[0]);
  };

  const fetchMealsByIngredient = async (ingredient, maxLength) => {
    let { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`).then((response) => response.json());
    meals = convertMeals(meals);
    return meals.slice(0, maxLength);
  };

  const fetchMealsByArea = async (area, maxLength) => {
    let { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`).then((response) => response.json());
    meals = convertMeals(meals);
    return meals.slice(0, maxLength);
  };

  const fetchMealsByName = async (name) => {
    const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`).then((response) => response.json());
    return convertMeals(meals);
  };

  const fetchMealsByFirstLetter = async (letter) => {
    const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`).then((response) => response.json());
    return convertMeals(meals);
  };

  return {
    fetchMeals,
    fetchMealCategories,
    fetchMealById,
    fetchMealsByIngredient,
    fetchMealsByName,
    fetchMealsByArea,
    fetchMealsByFirstLetter,
  };
}

export default useMeal;
