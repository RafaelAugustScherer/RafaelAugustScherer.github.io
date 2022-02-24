import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.props;

    const lowerCardRare = cardRare.toLowerCase().replace(' ', '-');
    return (
      <div className={ `card card-${lowerCardRare}` }>
        <p data-testid="name-card" className={ `card-name card-name-${lowerCardRare}` }>
          {cardName}
        </p>
        <img
          data-testid="image-card"
          className="card-image"
          src={
            cardImage
            || 'https://cdn0.iconfinder.com/data/icons/computer-interface-outline/128/Computer_Outline_Expand-10-512.png'
          }
          alt={ cardName }
        />
        <p
          data-testid="description-card"
          className={ `card-description card-description-${lowerCardRare}` }
        >
          {cardDescription}
        </p>
        <div>
          <span data-testid="attr1-card" className="card-attr">
            {`Clock: ${cardAttr1} GHz`}
          </span>
          <span data-testid="attr2-card" className="card-attr">
            {`VRAM: ${cardAttr2} GB`}
          </span>
          <span data-testid="attr3-card" className="card-attr">
            {`PCIe Gen: ${cardAttr3}.0`}
          </span>
          <span data-testid="rare-card" className="card-rare">
            {cardRare}
          </span>
        </div>
        {cardTrunfo ? (
          <img
            src="https://www.ebrink.com.br/media/catalog/category/super-trunfo-logo.jpg"
            alt="trunfo-logo"
            className="trunfo-logo"
            data-testid="trunfo-card"
          />
        ) : null}
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.number.isRequired,
  cardAttr2: PropTypes.number.isRequired,
  cardAttr3: PropTypes.number.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
