import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function Card({ thumb, name, index, url, id }) {
  return (
    <Link data-testid={ `${index}-recipe-card` } to={ `/${url}/${id}` } className="card">
      <img
        data-testid={ `${index}-card-img` }
        src={ thumb }
        alt={ name }
        className="card-image"
      />
      <p data-testid={ `${index}-card-name` } className="card-name">{ name }</p>
    </Link>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Card;
