import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import ExplorarCss from '../style/Explorar.module.css';

function ExplorarComidas() {
  const history = useHistory();

  const fetchRandomMeal = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((result) => history.push(`/comidas/${result.meals[0].idMeal}`));
  };

  return (
    <>
      <Header title="Explorar Comidas" />
      <div className={ ExplorarCss.explorarComidas }>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </button>

        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
        </button>

        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ fetchRandomMeal }
        >
          Me Surpreenda!
        </button>
      </div>
      <MenuInferior />
    </>
  );
}

export default ExplorarComidas;
