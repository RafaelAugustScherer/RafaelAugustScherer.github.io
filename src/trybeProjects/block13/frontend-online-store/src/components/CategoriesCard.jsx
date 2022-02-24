import React from 'react';
import PropTypes from 'prop-types';

class CategoriesCard extends React.Component {
  render() {
    const { categorie, id, onChange } = this.props;
    return (
      <div className="form-check">
        <label htmlFor={ id } className="form-check-label">
          {categorie}
          <input
            className="form-check-input"
            name="category"
            id={ id }
            value={ id }
            data-testid="category"
            type="radio"
            onChange={ onChange }
          />
        </label>
        <hr />
      </div>
    );
  }
}

CategoriesCard.propTypes = {
  categorie: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
}.isRequired;

export default CategoriesCard;
