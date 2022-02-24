function useDrink() {
  const convertDrink = (drink) => {
    const { idDrink: id, strDrink: name, strDrinkThumb: image, strAlcoholic } = drink;
    return { id, name, image, alcoholicOrNot: strAlcoholic, ...drink };
  };

  const convertDrinks = (drinks) => (
    drinks ? drinks.map((drink) => convertDrink(drink)) : null
  );

  const fetchDrinks = async (maxLength) => {
    let { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then((response) => response.json());
    drinks = convertDrinks(drinks);
    return drinks.slice(0, maxLength);
  };

  const fetchDrinkCategories = async (maxLength) => {
    const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').then((response) => response.json());
    return drinks.map(({ strCategory }) => strCategory).slice(0, maxLength);
  };

  const fetchDrinkById = async (id) => {
    const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) => response.json());
    return convertDrink(drinks[0]);
  };

  const fetchDrinksByIngredient = async (ingredient, maxLength) => {
    let { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`).then((response) => response.json());
    drinks = convertDrinks(drinks);
    return drinks.slice(0, maxLength);
  };

  const fetchDrinksByName = async (name) => {
    const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`).then((response) => response.json());
    return convertDrinks(drinks);
  };

  const fetchDrinksByFirstLetter = async (letter) => {
    const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`).then((response) => response.json());
    return convertDrinks(drinks);
  };

  return {
    fetchDrinks,
    fetchDrinkCategories,
    fetchDrinkById,
    fetchDrinksByIngredient,
    fetchDrinksByName,
    fetchDrinksByFirstLetter,
  };
}

export default useDrink;
