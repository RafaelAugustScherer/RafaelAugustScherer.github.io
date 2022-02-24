import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/checkout.css';

export default class Checkout extends Component {
  render() {
    const { cart } = this.props;
    let cartTotal = 0;

    return (
      <div>
        <section className="product-list">
          <h2>Lista de Produtos</h2>
          {cart.map(({ id, title, thumbnail, price }) => {
            cartTotal += price;
            return (
              <div key={ id }>
                <img src={ thumbnail } alt={ title } />
                <span>{title}</span>
                <span>{price}</span>
              </div>
            );
          })}
          <p>
            <strong>
              Total:
            </strong>
            { ` R$ ${cartTotal.toFixed(2)}` }
          </p>
        </section>
        <form className="checkout-info">
          <fieldset className="client-info">
            <legend>Informações do Comprador</legend>
            <input
              type="text"
              name="name"
              placeholder="Nome Completo"
              data-testid="checkout-fullname"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              data-testid="checkout-email"
            />
            <input type="text" name="cpf" placeholder="CPF" data-testid="checkout-cpf" />
            <input
              type="text"
              name="phone"
              placeholder="Telefone"
              data-testid="checkout-phone"
            />
            <input type="text" name="cep" placeholder="CEP" data-testid="checkout-cep" />
            <input
              type="text"
              name="address"
              placeholder="Endereço"
              data-testid="checkout-address"
            />
          </fieldset>
          <fieldset className="payment-info">
            <legend>Método de Pagamento</legend>
            <label htmlFor="boleto">
              Boleto
              <input type="radio" id="boleto" name="payment-method" value="boleto" />
            </label>
            <label htmlFor="card">
              Cartão
              <input type="radio" id="card" name="payment-method" value="card" />
            </label>
          </fieldset>
          <button type="button">Comprar</button>
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};
