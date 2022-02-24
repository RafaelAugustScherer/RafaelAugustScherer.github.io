import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import Game from './components/Game';
import CardList from './components/CardList';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardName: 'Gigabyte RTX 3070 Vision',
      cardDescription: `Placa de Vídeo Nvidia da Série Ampere com um
design arrojado focado em criadores de conteúdo`,
      cardAttr1: 1.815,
      cardAttr2: 8,
      cardAttr3: 4,
      cardImage:
        'https://images.kabum.com.br/produtos/fotos/130770/placa-de-video-gigabyte-nvidia-geforce-rtx-3070-vision-oc-8g-8gb-gddr6-gv-n3070vision-oc-8gd_1604413864_gg.jpg',
      cardRare: 'Raro',
      cardTrunfo: false,
      savedCards: [],
      randomizedCards: [],
      currentCard: 0,
      hasTrunfo: false,
      isGameStarted: false,
    };
  }

  startGame = () => {
    this.shuffleCards();
    this.setState({ isGameStarted: true, currentCard: 0 });
  };

  shuffleCards = () => {
    const { savedCards } = this.state;
    const RANDOM_FACTOR = 0.5;
    this.setState({
      randomizedCards: savedCards.sort(() => Math.random() - RANDOM_FACTOR),
    });
  };

  nextCard = () => {
    this.setState((prevState) => ({ currentCard: prevState.currentCard + 1 }));
  };

  cleanCardInfo = () => {
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'Normal',
      cardTrunfo: false,
    });
  };

  removeCardFromList = (removeCardName, isTrunfo) => {
    const { savedCards } = this.state;
    const newCards = savedCards.filter(({ cardName }) => cardName !== removeCardName);

    this.setState({
      savedCards: newCards,
    });
    if (isTrunfo) {
      this.setState({
        hasTrunfo: false,
      });
    }
  };

  onInputChange = ({ target: { type, name, value, checked } }) => {
    const MAX_DESCRIPTION_LINE_CHAR = 36;

    if (type === 'checkbox') value = checked;
    if (type === 'number') value = Number(value);

    if (name === 'cardDescription' && value.length % MAX_DESCRIPTION_LINE_CHAR === 0) {
      value += '\n';
    }

    this.setState({
      [name]: value,
    });
  };

  isSaveButtonDisabled = () => {
    const { state } = this;
    const { cardAttr1, cardAttr2, cardAttr3 } = state;
    const Attributes = [Number(cardAttr1), Number(cardAttr2), Number(cardAttr3)];
    const maxAttrPoints = 90;
    const maxCardPoints = 210;

    const isEmpty = Object.entries(state).find((prop) => prop[1] === '');
    const isSumGreaterThan210 = Attributes.reduce((a, c) => a + c) > maxCardPoints;
    const isGreaterThanNinety = Attributes.some((attr) => attr > maxAttrPoints);
    const isWorseThanZero = Attributes.some((attr) => attr < 0);
    return !!(isEmpty || isSumGreaterThan210 || isGreaterThanNinety || isWorseThanZero);
  };

  onSaveButtonClick = (e) => {
    e.preventDefault();
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      savedCards,
    } = this.state;

    const newCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };

    const newSavedCards = [...savedCards, newCard];

    this.setState({
      savedCards: newSavedCards,
    });
    if (cardTrunfo) this.setState({ hasTrunfo: true });
    this.cleanCardInfo();
  };

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
      hasTrunfo,
      savedCards,
      isGameStarted,
      randomizedCards,
      currentCard,
    } = this.state;
    const {
      startGame,
      isSaveButtonDisabled,
      onSaveButtonClick,
      onInputChange,
      removeCardFromList,
      nextCard,
    } = this;
    return (
      <>
        <h1>Tryunfo - GPUs</h1>
        {!isGameStarted ? (
          <>
            <section>
              <Form
                onInputChange={ onInputChange }
                isSaveButtonDisabled={ isSaveButtonDisabled() }
                onSaveButtonClick={ onSaveButtonClick }
                hasTrunfo={ hasTrunfo }
                cardName={ cardName }
                cardDescription={ cardDescription }
                cardAttr1={ cardAttr1 }
                cardAttr2={ cardAttr2 }
                cardAttr3={ cardAttr3 }
                cardImage={ cardImage }
                cardRare={ cardRare }
                cardTrunfo={ cardTrunfo }
              />
              <div className="card-preview">
                <h2>Pré-visualização</h2>
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
              </div>
            </section>
            <CardList cards={ savedCards } onDelete={ removeCardFromList } />
            <button
              type="button"
              onClick={ startGame }
              disabled={ savedCards.length < 1 }
            >
              Jogar
            </button>
          </>
        ) : (
          <Game
            cards={ randomizedCards }
            currentPosition={ currentCard }
            onNextCard={ nextCard }
            onRestartGame={ startGame }
          />
        )}
      </>
    );
  }
}

export default App;
