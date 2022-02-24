import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';

class Cart extends Component {
  render() {
    const { cart, addRemoveButton, isButtonDisabled, produtoQuantity } = this.props;

    return (
      <div>
        {cart.length === 0 ? (
          <span data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </span>
        ) : (
          cart.map((elem) => (
            <div key={ elem.id }>
              <p data-testid="shopping-cart-product-name">{elem.title}</p>
              <p data-testid="shopping-cart-product-quantity">
                {elem.quantity}
              </p>
              <button
                type="button"
                onClick={ () => addRemoveButton(elem, '-') }
                data-testid="product-decrease-quantity"
              >
                -
              </button>
              <button
                type="button"
                disabled={ isButtonDisabled(elem.quantity, elem.available_quantity) }
                onClick={ () => addRemoveButton(elem, '+') }
                data-testid="product-increase-quantity"
              >
                +
              </button>
              <button
                type="button"
                onClick={ () => addRemoveButton(elem, 'x') }
              >
                x
              </button>
            </div>
          ))
        )}
        <Link to="/checkout">
          <button type="button" data-testid="checkout-products">Finalizar Compra</button>
        </Link>
        <Link to="/cart">
          <BsCart4 data-testid="shopping-cart-button" className="cart" />
          <div data-testid="shopping-cart-size">
            { produtoQuantity }
          </div>
        </Link>
      </div>
    );
  }
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object),
  addRemoveButton: PropTypes.func,
  isButtonDisabled: PropTypes.func,
  produtoQuantity: PropTypes.number,
}.isRequired;

export default Cart;
