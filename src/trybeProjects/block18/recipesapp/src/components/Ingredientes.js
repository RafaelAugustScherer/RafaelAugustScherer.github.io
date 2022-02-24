import React, { useContext, useEffect, useState, useCallback } from 'react';
import DetailsContext from '../context/DetailsContext';

function Ingredientes() {
  const MAX_INGREDIENT = 20;
  const {
    id,
    refeicao,
    setTotalIngredientes,
    ingredientes,
    setIngredientes,
    isInProgress,
    mealsOrCocktails,
  } = useContext(DetailsContext);
  const [ingredientsList, setIngredientsList] = useState([]);

  const handleIngredient = (ingredient) => {
    const previousStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let newIngredientes = [];

    if (ingredientes.includes(ingredient)) {
      newIngredientes = ingredientes
        .filter((ingrediente) => ingrediente !== ingredient);
    } else {
      newIngredientes = [...ingredientes, ingredient];
    }

    setIngredientes(newIngredientes);
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      { ...previousStorage,
        [mealsOrCocktails()]:
          { ...previousStorage[mealsOrCocktails()],
            [id]: newIngredientes },
      },
    ));
  };

  const isInLocalStorage = (ingredient) => {
    const currentStatus = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (currentStatus[mealsOrCocktails()][id]) {
      return currentStatus[mealsOrCocktails()][id].includes(ingredient);
    }
    return false;
  };

  const fillIngredientsList = useCallback(() => {
    setIngredientsList([]);
    for (let index = 1; index <= MAX_INGREDIENT; index += 1) {
      const ingredient = refeicao[`strIngredient${index}`];
      const measure = refeicao[`strMeasure${index}`];

      if (ingredient && !isInProgress) {
        const li = (
          <li
            data-testid={ `${index - 1}-ingredient-name-and-measure` }
            key={ ingredient }
          >
            { ingredient }
            { ' - ' }
            { measure }
          </li>
        );
        setIngredientsList((prevList) => [...prevList, li]);
      } else if (ingredient) {
        const checkbox = (
          <li key={ ingredient } data-testid={ `${index - 1}-ingredient-step` }>
            <input
              type="checkbox"
              onChange={ () => handleIngredient(ingredient) }
              checked={ isInLocalStorage(ingredient) }
            />
            <span>
              { ingredient }
              { ' - ' }
              { measure }
            </span>
          </li>
        );
        setIngredientsList((prevList) => [...prevList, checkbox]);
      }
    }
    // eslint-disable-next-line
  }, [isInProgress, ingredientes]);

  useEffect(() => {
    fillIngredientsList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fillIngredientsList();
  }, [setIngredientsList, fillIngredientsList]);

  useEffect(() => {
    setTotalIngredientes(ingredientsList.length);
  }, [ingredientsList, setTotalIngredientes]);

  return (
    <ul>
      { ingredientsList.map((el) => el) }
    </ul>
  );
}

export default Ingredientes;
