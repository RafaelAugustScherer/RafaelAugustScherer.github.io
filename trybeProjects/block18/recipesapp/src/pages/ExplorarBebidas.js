import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import ExplorarCss from '../style/Explorar.module.css';

function ExplorarBebidas() {
  const history = useHistory();

  const fetchRandomDrink = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((result) => history.push(`/bebidas/${result.drinks[0].idDrink}`));
  };
  return (
    <>
      <Header title="Explorar Bebidas" />
      <div className={ ExplorarCss.explorar }>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
        </button>

        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ fetchRandomDrink }
        >
          Me Surpreenda!
        </button>
      </div>
      <MenuInferior />
    </>
  );
}

export default ExplorarBebidas;
