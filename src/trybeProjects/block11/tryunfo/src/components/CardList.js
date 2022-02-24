import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Filter from './Filter';

class CardList extends Component {
  constructor() {
    super();

    this.state = {
      nameFilter: '',
      rareFilter: 'Todas',
      trunfoFilter: false,
    };
  }

  onFilterInput = ({ target: { name, value, type, checked } }) => {
    value = type === 'checkbox' ? checked : value;

    this.setState({
      [name]: value,
    });
  };

  filterCard = (cardName, cardRare, cardTrunfo) => {
    const { nameFilter, rareFilter, trunfoFilter } = this.state;

    const isName = cardName.toLowerCase().includes(nameFilter.toLowerCase());
    const isRare = rareFilter === 'Todas' ? true : rareFilter === cardRare;
    const isTrunfo = trunfoFilter ? cardTrunfo : true;
    return !!(isName && isRare && isTrunfo);
  };

  render() {
    const { cards, onDelete } = this.props;
    const { nameFilter, rareFilter, trunfoFilter } = this.state;
    return (
      <section>
        <Filter
          onFilterInput={ this.onFilterInput }
          nameValue={ nameFilter }
          rareValue={ rareFilter }
          trunfoValue={ trunfoFilter }
        />
        <div className="Card-list">
          <h2>Lista de Cartas </h2>
          {cards.map(
            (
              {
                cardName,
                cardDescription,
                cardAttr1,
                cardAttr2,
                cardAttr3,
                cardImage,
                cardRare,
                cardTrunfo,
              },
              idx,
            ) => {
              if (this.filterCard(cardName, cardRare, cardTrunfo)) {
                return (
                  <div key={ idx }>
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
                      data-testid="delete-button"
                      onClick={ () => onDelete(cardName, cardTrunfo) }
                      className="delete-button fade-in"
                    >
                      X
                    </button>
                  </div>
                );
              }
              return false;
            },
          )}
        </div>
      </section>
    );
  }
}

CardList.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CardList;
