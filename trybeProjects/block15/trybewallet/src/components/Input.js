import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { headers } from '../data';

class Input extends Component {
  render() {
    const { type, valueObj, onChange } = this.props;
    const name = Object.keys(valueObj)[0];
    const value = Object.values(valueObj)[0];

    return (
      <label htmlFor={ name }>
        { headers[name] }
        <input
          type={ type }
          name={ name }
          id={ name }
          data-testid={ `${name}-input` }
          onChange={ onChange }
          value={ value }
        />
      </label>
    );
  }
}

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  valueObj: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func,
}.isRequired;
