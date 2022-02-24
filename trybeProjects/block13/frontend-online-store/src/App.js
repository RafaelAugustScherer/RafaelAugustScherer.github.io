import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Specs from './pages/Specs';
import Checkout from './pages/Checkout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor() {
    super();

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.state = {
      cart,
      produtoQuantity: 0,
    };
  }

  componentDidMount() {
    const { cart } = this.state;
    this.produtoQuantityFunc(cart);
  }

  produtoQuantityFunc = (cart) => {
    const number = cart.reduce((a, b) => a + b.quantity, 0);
    this.setState({ produtoQuantity: number });
  }

  cartHandler = async (product, addRemove: '+') => {
    const { cart } = this.state;
    const isProductInCart = !!cart.find(({ id }) => id === product.id);

    const newCart = isProductInCart
      ? cart.reduce((acc, cartProduct) => {
        let operation = { ...cartProduct, quantity: cartProduct.quantity + 1 };
        if (addRemove === '-') {
          operation = { ...cartProduct, quantity: cartProduct.quantity - 1 };
          if (cartProduct.quantity - 1 === 0) {
            addRemove = 'x';
          }
        }

        if (addRemove === 'x' && cartProduct.id === product.id) {
          return acc;
        }

        return (cartProduct.id === product.id
          ? [...acc, operation]
          : [...acc, cartProduct]);
      }, [])
      : [...cart, { ...product, quantity: 1 }];

    localStorage.setItem('cart', JSON.stringify(newCart));
    this.setState({ cart: newCart });
    this.produtoQuantityFunc(newCart);
  };

  handleIncreaseButton = (quantity, availableQuantity) => {
    if (quantity < availableQuantity) return false;
    return true;
  }

  render() {
    const { cart, produtoQuantity } = this.state;
    const { cartHandler, handleIncreaseButton } = this;

    return (
      <div className="App container">
        <BrowserRouter>
          <Switch>
            <Route
              path="/cart"
              render={ (props) => (
                <Cart
                  { ...props }
                  isButtonDisabled={ handleIncreaseButton }
                  addRemoveButton={ cartHandler }
                  cart={ cart }
                  produtoQuantity={ produtoQuantity }
                />
              ) }
            />
            <Route
              exact
              path="/"
              render={ (props) => (
                <Home
                  { ...props }
                  onAddToCart={ cartHandler }
                  produtoQuantity={ produtoQuantity }
                />
              ) }
            />
            <Route
              path="/specs/:id"
              render={ (props) => (
                <Specs
                  { ...props }
                  onAddToCart={ cartHandler }
                  produtoQuantity={ produtoQuantity }
                />
              ) }
            />
            <Route
              path="/checkout"
              render={
                (props) => <Checkout { ...props } cart={ cart } />
              }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
