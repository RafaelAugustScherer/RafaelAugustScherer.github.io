import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { headers } from '../data';
import EditDeleteButton from './EditDeleteButton';

class Table extends Component {
  constructor() {
    super();

    this.parseNumber = this.parseNumber.bind(this);
    this.plotExpenseRows = this.plotExpenseRows.bind(this);
  }

  parseNumber(str) {
    return Number(str).toFixed(2);
  }

  plotExpenseRows(expense) {
    const { parseNumber } = this;
    const { onEdit } = this.props;
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    } = expense;
    const { [currency]: { name } } = exchangeRates;
    let { [currency]: { ask } } = exchangeRates;
    const conversionCoin = 'Real';
    const total = parseNumber(value * ask);
    ask = parseNumber(ask);

    return (
      <tr key={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ name }</td>
        <td>{ ask }</td>
        <td>{ total }</td>
        <td>{ conversionCoin }</td>
        <td>
          <EditDeleteButton
            id={ id }
            edit={ () => onEdit({
              id,
              value,
              description,
              currency,
              method,
              tag,
              exchangeRates,
            }) }
          />
        </td>
      </tr>
    );
  }

  render() {
    const { plotExpenseRows } = this;
    const { expenses } = this.props;

    return (
      <table className="wallet-table">
        <thead>
          <tr>
            {Object.values(headers).map((header) => (
              <th key={ header }>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => plotExpenseRows(expense))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
