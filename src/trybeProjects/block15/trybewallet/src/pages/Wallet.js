import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from '../components/Select';
import { fetchCoins, saveExpense } from '../actions';
import Table from '../components/Table';
import Input from '../components/Input';
import './wallet.css';

class Wallet extends Component {
  constructor() {
    super();

    this.state = {
      formData: {
        id: 0,
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
      initialState: {},
      submitBtnText: 'Adicionar despesa',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveInitialFormValues = this.saveInitialFormValues.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.editExpense = this.editExpense.bind(this);
  }

  componentDidMount() {
    const { fetchCoinsAction } = this.props;
    fetchCoinsAction();

    this.saveInitialFormValues();
  }

  saveInitialFormValues() {
    this.setState(({ formData }) => ({ initialState: formData }));
  }

  handleChange({ target: { id, value } }) {
    this.setState(
      ({ formData }) => ({ formData: { ...formData, [id]: value } }),
    );
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { saveExpenseAction, fetchCoinsAction } = this.props;
    let { formData } = this.state;

    if (!('exchangeRates' in formData)) {
      const exchangeRates = await fetchCoinsAction();
      formData = { ...formData, exchangeRates };
    }

    saveExpenseAction(formData);
    this.clearForm();
  }

  clearForm() {
    this.setState(
      ({ initialState, formData: { id } }) => (
        { formData: { ...initialState, id: id + 1 }, submitBtnText: 'Adicionar despesa' }
      ),
      () => this.saveInitialFormValues(),
    );
  }

  parseNumber(str) {
    return parseFloat(Number(str).toFixed(2));
  }

  calculateTotal() {
    const { expenses } = this.props;

    const total = expenses.reduce(
      (acc, { value, currency, exchangeRates: { [currency]: { ask } } }) => (
        acc + (value * ask)
      ), 0,
    );
    return this.parseNumber(total);
  }

  editExpense(expense) {
    this.setState({ formData: { ...expense }, submitBtnText: 'Editar despesa' });
  }

  render() {
    const { handleChange, handleSubmit, calculateTotal, editExpense } = this;
    const { email, expenses } = this.props;
    const { formData: { value, description, currency, method, tag },
      submitBtnText } = this.state;

    const generalProps = { onChange: handleChange };
    console.log(expenses);
    return (
      <div className="wallet">
        <header>
          <span data-testid="email-field">{ email }</span>
          <span>
            <span span data-testid="total-field">{ calculateTotal() }</span>
            <span data-testid="header-currency-field">BRL</span>
          </span>
        </header>
        <div className="wallet-div">
          <form onSubmit={ handleSubmit } className="wallet-form">
            <Input type="number" valueObj={ { value } } { ...generalProps } />
            <Input type="text" valueObj={ { description } } { ...generalProps } />
            <Select type="currencies" valueObj={ { currency } } { ...generalProps } />
            <Select type="methods" valueObj={ { method } } { ...generalProps } />
            <Select type="tags" valueObj={ { tag } } { ...generalProps } />
            <button type="submit">{ submitBtnText }</button>
          </form>
          <Table onEdit={ editExpense } />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenseAction: (formData) => dispatch(saveExpense(formData)),
  fetchCoinsAction: () => dispatch(fetchCoins()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
  saveExpenseAction: PropTypes.func,
  fetchCoinsAction: PropTypes.func,
}.isRequired;
