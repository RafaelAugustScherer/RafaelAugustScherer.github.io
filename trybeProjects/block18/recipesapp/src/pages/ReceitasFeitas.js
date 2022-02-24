import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import FilterButtons from '../components/FilterButtons';
import CardRecipes from '../components/CardRecipes';
import RecipesContext from '../context/RecipesContext';

function ReceitasFeitas() {
  const {
    startLocalStorage, doneRecipes, setDoneRecipes } = useContext(RecipesContext);
  startLocalStorage();
  const storageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  useEffect(() => {
    setDoneRecipes(storageDoneRecipes);
  // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header title="Receitas Feitas" />
      <FilterButtons
        setRecipes={ setDoneRecipes }
        doneRecipes={ storageDoneRecipes }
      />
      {
        doneRecipes.map((recipe, index) => (
          <CardRecipes
            key={ recipe.name }
            index={ index }
            recipe={ recipe }
            url={ recipe.type === 'comida' ? 'comidas' : 'bebidas' }
            donePage
          />))
      }
    </>
  );
}

export default ReceitasFeitas;
