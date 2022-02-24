import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
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
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    return (
      <form>
        <legend>Adicionar nova carta</legend>
        <label htmlFor="cardName">
          <span className="name-input-span">Nome</span>
          <input
            type="text"
            data-testid="name-input"
            className="name-input"
            name="cardName"
            value={ cardName }
            onChange={ onInputChange }
            maxLength="24"
          />
        </label>
        <label htmlFor="cardDescription">
          <span className="description-input-span">Descrição</span>
          <textarea
            data-testid="description-input"
            className="description-input"
            name="cardDescription"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardAttr1">
          <span className="attr-input-span">Clock</span>
          <input
            type="number"
            data-testid="attr1-input"
            className="attr-input"
            name="cardAttr1"
            value={ cardAttr1 }
            onChange={ onInputChange }
            step="0.001"
          />
          <span className="measurementUnit">GHz</span>
        </label>
        <label htmlFor="cardAttr2">
          <span className="attr-input-span">VRAM</span>
          <input
            type="number"
            data-testid="attr2-input"
            className="attr-input"
            name="cardAttr2"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />
          <span className="measurementUnit">GB</span>
        </label>
        <label htmlFor="cardAttr1">
          <span className="attr-input-span">PCIe Gen</span>
          <input
            type="number"
            data-testid="attr3-input"
            className="attr-input"
            name="cardAttr3"
            value={ cardAttr3 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardImage">
          <span className="image-input-span">Imagem</span>
          <input
            type="text"
            data-testid="image-input"
            className="image-input"
            name="cardImage"
            value={ cardImage }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardRare">
          <span className="rare-input-span">Raridade</span>
          <select
            data-testid="rare-input"
            className="rare-input"
            name="cardRare"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option value="Normal">Normal</option>
            <option value="Raro">Raro</option>
            <option value="Muito raro">Muito raro</option>
          </select>
        </label>
        {hasTrunfo ? (
          <span>Você já tem um Super Trunfo em seu baralho</span>
        ) : (
          <label htmlFor="cardTrunfo">
            <input
              type="checkbox"
              data-testid="trunfo-input"
              className="trunfo-input"
              name="cardTrunfo"
              checked={ cardTrunfo }
              onChange={ onInputChange }
            />
            <span className="trunfo-input-span">Super Tryunfo</span>
          </label>
        )}

        <button
          type="submit"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.number.isRequired,
  cardAttr2: PropTypes.number.isRequired,
  cardAttr3: PropTypes.number.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
