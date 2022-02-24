import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import useRecipe from '../hooks/UseRecipe';
import RecipesContext from '../context/RecipesContext';
import ExplorarIngredientes from '../style/ExplorarIngredientes.module.css';


function ExplorarBebidasIngrediente() {
  const [filterByIngredientDrink, setFilterByIngredientDrink] = useState([]);
  const { setBebidas } = useContext(RecipesContext);

  const MAX_LENGTH = 12;
  const { fetchRecipesByIngredient } = useRecipe(MAX_LENGTH);

  async function fetchDrinksIngredients() {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const result = await response.json();
    setFilterByIngredientDrink(result.drinks);
  }

  useEffect(() => {
    fetchDrinksIngredients();
  }, []);

  const setDrinksByIngredients = async (ingredient) => {
    const newBebidas = await fetchRecipesByIngredient('bebidas', ingredient);
    setBebidas(newBebidas);
  };

  const ingredientsLimit = filterByIngredientDrink.slice(0, MAX_LENGTH);

  return (
    <>
      <Header title="Explorar Ingredientes" />
      <div className={ ExplorarIngredientes.itens }>
        { ingredientsLimit.map(({ strIngredient1: ingredient }, index) => (
          <Link
            key={ ingredient }
            to="/bebidas"
            onClick={ () => setDrinksByIngredients(ingredient) }
          >
            <div className={ ExplorarIngredientes.item } data-testid={ `${index}-ingredient-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
                alt={ ingredient }
                key={ index }
              />
              <h4
                data-testid={ `${index}-card-name` }
              >
                { ingredient }
              </h4>
            </div>
          </Link>
        ))}
      </div>
      <MenuInferior />
    </>
  );
}

export default ExplorarBebidasIngrediente;
