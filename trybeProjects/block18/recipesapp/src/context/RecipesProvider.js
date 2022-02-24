import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import RecipesContext from './RecipesContext';
import UseRecipe from '../hooks/UseRecipe';

function RecipesProvider({ children }) {
  const MAX_LENGTH = 12;
  const { fetchRecipes } = UseRecipe(MAX_LENGTH);

  const [comidas, setComidas] = useState();
  const [bebidas, setBebidas] = useState();
  const [comidasBackup, setComidasBackup] = useState([]);
  const [bebidasBackup, setBebidasBackup] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const fetchComidas = async () => {
      const meals = await fetchRecipes('comidas');
      setComidasBackup(meals);
    };

    const fetchBebidas = async () => {
      const drinks = await fetchRecipes('bebidas');
      setBebidasBackup(drinks);
    };

    fetchComidas();
    fetchBebidas();
    // eslint-disable-next-line
  }, []);

  const startLocalStorage = () => {
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({ cocktails: {}, meals: {} }));
    }
    if (!localStorage.getItem('doneRecipes')) {
      localStorage
        .setItem('doneRecipes', JSON.stringify([]));
    }

    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([]));
    }

    if (!localStorage.getItem('user')) {
      localStorage
        .setItem('user', JSON.stringify({ email: '' }));
    }
  };

  const contextValue = {
    comidasBackup,
    setComidasBackup,
    bebidasBackup,
    setBebidasBackup,
    comidas,
    setComidas,
    bebidas,
    setBebidas,
    favoriteRecipes,
    setFavoriteRecipes,
    startLocalStorage,
    doneRecipes,
    setDoneRecipes,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
