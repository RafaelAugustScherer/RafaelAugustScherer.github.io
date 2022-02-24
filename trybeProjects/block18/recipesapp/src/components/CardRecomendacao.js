import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function CardRecomendacao({ thumb, name, index, url, id }) {
  return (
    <Link
      data-testid={ `${index}-recomendation-card` }
      to={ `/${url}/${id}` }
      className="card-recomendations"
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ thumb }
        alt={ name }
        className="img-recomendations"
      />
      <p data-testid={ `${index}-recomendation-title` }>{ name }</p>
    </Link>
  );
}

CardRecomendacao.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default CardRecomendacao;
