import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class Game extends Component {
  areRemainingCards = () => {
    const { cards, currentPosition } = this.props;

    return cards.length - 1 - currentPosition > 0;
  };

  render() {
    const { cards, currentPosition, onNextCard, onRestartGame } = this.props;
    const { areRemainingCards } = this;
    const currentCard = cards[currentPosition];
    const remainingCards = String(cards.length - 1 - currentPosition).padStart(2, '0');
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = currentCard;
    return (
      <div className="Game">
        <div>
          <div>
            <Card
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
            />
            <button
              type="button"
              className="next-card-button"
              onClick={ onNextCard }
              disabled={ !areRemainingCards() }
            >
              Próxima carta &gt;
            </button>
          </div>
          <div>
            <img src="./card-back.png" alt="dummy-card" className="dummy-card" />
            <span className="remaining-cards-span">
              Cartas restantes:
              {' '}
              {remainingCards}
            </span>
          </div>
        </div>
        {!areRemainingCards() ? (
          <button type="button" onClick={ onRestartGame } className="restart-game-button">
            Embaralhar cartas
          </button>
        ) : null}
      </div>
    );
  }
}

Game.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPosition: PropTypes.number.isRequired,
  onNextCard: PropTypes.func.isRequired,
  onRestartGame: PropTypes.func.isRequired,
};

export default Game;
