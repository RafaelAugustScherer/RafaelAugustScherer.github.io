import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import data, { headers } from '../data';

class Select extends Component {
  render() {
    const { type, valueObj, onChange, currencies } = this.props;
    const name = Object.keys(valueObj)[0];
    const value = Object.values(valueObj)[0];

    const dataPlusRedux = { ...data, currencies };
    const optionsIterator = [...dataPlusRedux[type]];

    return (
      <label htmlFor={ name }>
        { headers[name] }
        <select
          id={ name }
          name={ name }
          data-testid={ `${name}-input` }
          onChange={ onChange }
          value={ value }
        >
          { optionsIterator.map((option) => (
            <option
              key={ option }
              value={ option }
              data-testid={ option }
            >
              { option }
            </option>
          ))}
        </select>
      </label>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

export default connect(mapStateToProps)(Select);

Select.propTypes = {
  type: PropTypes.string,
  valueObj: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string),
}.isRequired;
