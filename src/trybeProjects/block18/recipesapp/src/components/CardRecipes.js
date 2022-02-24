import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import BotaoShareAndFavorite from './BotaoShareAndFavorite';

function CardRecipes(
  { recipe: { id, name, image, type, area, category, alcoholicOrNot, doneDate, tags },
    index,
    url,
    donePage },
) {
  return (
    <div className="card card-favorites">
      <Link
        to={ `/${url}/${id}` }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
          className="card-image"
        />
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {
            type === 'comida' ? (`${area} - ${category}`) : (`${alcoholicOrNot}`)
          }
        </p>
        {
          donePage && (
            <>
              <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
              <ul>
                {
                  type === 'comida' && (
                    tags.map((tag, tagIndex) => {
                      if (tagIndex <= 1) {
                        return (
                          <p data-testid={ `${index}-${tag}-horizontal-tag` }>{ tag }</p>
                        );
                      }
                      return null;
                    })
                  )
                }
              </ul>
            </>
          )
        }
      </Link>
      <BotaoShareAndFavorite id={ id } index={ index } type={ type } />
    </div>
  );
}

CardRecipes.propTypes = {
  index: PropTypes.number,
  url: PropTypes.string,
  recipe: PropTypes.object,
}.isRequired;

export default CardRecipes;
