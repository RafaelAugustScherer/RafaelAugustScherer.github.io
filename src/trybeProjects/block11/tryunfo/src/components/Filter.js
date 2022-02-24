import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
  render() {
    const { onFilterInput, nameValue, rareValue, trunfoValue } = this.props;
    return (
      <aside>
        <h2>Filtros de busca</h2>
        <div className="filters">
          <input
            type="text"
            data-testid="name-filter"
            name="nameFilter"
            value={ nameValue }
            onChange={ onFilterInput }
            placeholder="Nome da carta"
          />
          <select
            data-testid="rare-filter"
            name="rareFilter"
            value={ rareValue }
            onChange={ onFilterInput }
          >
            <option value="Todas">Todas</option>
            <option value="Normal">Normal</option>
            <option value="Raro">Raro</option>
            <option value="Muito raro">Muito raro</option>
          </select>
          <label htmlFor="trunfoFilter">
            Super Trunfo
            <input
              type="checkbox"
              data-testid="trunfo-filter"
              name="trunfoFilter"
              checked={ trunfoValue }
              onChange={ onFilterInput }
            />
          </label>
        </div>
      </aside>
    );
  }
}

Filter.propTypes = {
  onFilterInput: PropTypes.func.isRequired,
  nameValue: PropTypes.string.isRequired,
  rareValue: PropTypes.string.isRequired,
  trunfoValue: PropTypes.bool.isRequired,
};

export default Filter;
