import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import CardRecomendacao from './CardRecomendacao';
import Ingredientes from './Ingredientes';
import DetailsContext from '../context/DetailsContext';
import BotaoShareAndFavorite from './BotaoShareAndFavorite';
import DetalhesCss from '../style/Detalhes.module.css';

function Come({ isLoading }) {
  const { refeicao, recomendadas } = useContext(DetailsContext);
  if (Object.keys(refeicao).length === 0) return null;
  const {
    name,
    image,
    strCategory,
    strInstructions,
    strYoutube = '',
  } = refeicao;

  const strYoutubeArray = strYoutube.split('=');
  const newStrYoutube = `https://www.youtube.com/embed/${strYoutubeArray[1]}`;

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ image }
        alt="Recipe"
        className={ DetalhesCss.imgDetails }
      />

      <div className={ DetalhesCss.textContainer }>
        <p data-testid="recipe-title">{ name }</p>
        <p data-testid="recipe-category">{ strCategory }</p>
        <BotaoShareAndFavorite type="comida" />
        <h2>Ingredients</h2>
        {
          !isLoading && <Ingredientes />
        }
        <h2>Instructions</h2>
        <p data-testid="instructions" className="instructions">{ strInstructions }</p>
        <h2>Video</h2>
        <iframe
          data-testid="video"
          width="200"
          height="300"
          src={ newStrYoutube }
          title={ name }
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
        <h2>Recomendadas</h2>
        <div className="carrossel">
          { recomendadas
            .map(({ id, name: drinkName, image: drinkImage }, index) => (
              <CardRecomendacao
                key={ drinkName }
                thumb={ drinkImage }
                name={ drinkName }
                index={ index }
                id={ id }
                url="bebidas"
              />
            )) }
        </div>
      </div>
    </>
  );
}

Come.propTypes = {
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

export default Come;
