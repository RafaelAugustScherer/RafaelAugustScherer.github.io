import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import UseRecipe from '../hooks/UseRecipe';
import categoryCss from '../style/Category.module.css';

function CategoryFilters({ comidasOuBebidas }) {
  const [state, setState] = useState({
    categories: [],
    currentFilter: '',
  });
  const {
    setComidas,
    setBebidas,
  } = useContext(RecipesContext);

  const MAX_LENGTH_CATEGORY = 5;
  const { fetchCategories } = UseRecipe(MAX_LENGTH_CATEGORY);

  useEffect(() => {
    const setInitialState = async () => {
      const categories = await fetchCategories(comidasOuBebidas);
      setState({ ...state, categories });
    };
    setInitialState();
    // eslint-disable-next-line
  }, []);

  const fetchByCategory = async (category) => {
    const MAX_LENGTH = 12;
    if (comidasOuBebidas === 'comidas') {
      const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      let { meals } = await fetch(ENDPOINT).then((response) => response.json());
      meals = meals.map((meal) => {
        const { idMeal: id, strMeal: name, strMealThumb: image } = meal;
        return { id, name, image, ...meal };
      });
      setComidas(meals.slice(0, MAX_LENGTH));
      setState({ ...state, currentFilter: category });
    } else {
      const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      let { drinks } = await fetch(ENDPOINT).then((response) => response.json());
      drinks = drinks.map((drink) => {
        const { idDrink: id, strDrink: name, strDrinkThumb: image } = drink;
        return { id, name, image, ...drink };
      });
      setBebidas(drinks.slice(0, MAX_LENGTH));
      setState({ ...state, currentFilter: category });
    }
  };

  const toggleFilter = async (category) => {
    const { currentFilter } = state;

    if (currentFilter === category) {
      setComidas(undefined);
      setBebidas(undefined);
      setState({ ...state, currentFilter: '' });
      return null;
    }
    fetchByCategory(category);
  };

  const resetFilter = () => {
    setComidas(undefined);
    setBebidas(undefined);
  };

  return (
    <div className={ comidasOuBebidas === 'comidas' ? categoryCss.category : categoryCss.categoryDrink }>
      categoryCss.category
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => resetFilter() }
      >
        All
      </button>
      {
        state.categories.map((category) => (
          <button
            data-testid={ `${category}-category-filter` }
            key={ category }
            type="button"
            onClick={ () => toggleFilter(category) }
          >
            { category }
          </button>
        ))
      }
    </div>
  );
}

CategoryFilters.propTypes = {
  comidasOuBebidas: PropTypes.string,
}.isRequired;

export default CategoryFilters;
