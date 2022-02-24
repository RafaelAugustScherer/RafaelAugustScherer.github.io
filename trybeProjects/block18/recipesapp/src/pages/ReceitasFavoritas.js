import React, { useEffect, useContext } from 'react';
import CardRecipes from '../components/CardRecipes';
import FilterButtons from '../components/FilterButtons';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function ReceitasFavoritas() {
  const {
    startLocalStorage, favoriteRecipes, setFavoriteRecipes } = useContext(RecipesContext);
  startLocalStorage();
  const storageFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  useEffect(() => {
    setFavoriteRecipes(storageFavoriteRecipes);
  // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header title="Receitas Favoritas" />
      <FilterButtons
        setRecipes={ setFavoriteRecipes }
        favorite
        favoriteRecipes={ storageFavoriteRecipes }
      />
      {
        favoriteRecipes.map((recipe, index) => (
          <CardRecipes
            key={ recipe.name }
            index={ index }
            recipe={ recipe }
            url={ recipe.type === 'comida' ? 'comidas' : 'bebidas' }
          />))
      }
    </>
  );
}

export default ReceitasFavoritas;
