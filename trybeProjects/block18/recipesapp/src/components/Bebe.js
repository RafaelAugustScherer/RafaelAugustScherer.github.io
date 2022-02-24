import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import CardRecomendacao from './CardRecomendacao';
import DetailsContext from '../context/DetailsContext';
import Ingredientes from './Ingredientes';
import BotaoShareAndFavorite from './BotaoShareAndFavorite';
import DetalhesCss from '../style/Detalhes.module.css';

function Bebe({ isLoading }) {
  const { refeicao, recomendadas } = useContext(DetailsContext);
  if (Object.keys(refeicao).length === 0) return null;
  const {
    name,
    image,
    strCategory,
    strInstructions,
    alcoholicOrNot,
  } = refeicao;

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ image }
        className={ DetalhesCss.imgDetails }
        alt="Recipe"
      />
      <div className={ DetalhesCss.textContainer }>
        <p data-testid="recipe-title">{ name }</p>
        <p data-testid="recipe-category">{ `${strCategory} ${alcoholicOrNot}` }</p>
        <BotaoShareAndFavorite type="bebida" />
        <h2>Ingredients</h2>
        {
          !isLoading && <Ingredientes />
        }
        <h2>Instructions</h2>
        <p data-testid="instructions">{ strInstructions }</p>
        <h2>Recomendadas</h2>
        <div className="carrossel">
          { recomendadas
            .map(({ id, name: mealName, image: mealImage }, index) => (
              <CardRecomendacao
                key={ mealName }
                thumb={ mealImage }
                name={ mealName }
                index={ index }
                id={ id }
                url="comidas"
              />
            )) }
        </div>
      </div>
    </>
  );
}

Bebe.propTypes = {
  id: PropTypes.string,
  recomendadas: PropTypes.arrayOf(PropTypes.object),
  refeicao: PropTypes.shape({
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    strYoutube: PropTypes.string,
  }),
}.isRequired;

export default Bebe;
