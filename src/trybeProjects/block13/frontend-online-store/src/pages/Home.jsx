import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BsCart4 } from 'react-icons/bs';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      cart: [],
      query: '',
      category: '',
      products: [],
      isSearching: false,
      isSearchEmpty: false,
    };
  }

  onQueryChange = ({ target: { value } }) => {
    this.setState({ query: value });
  };

  onCategoryChange = ({ target: { value } }) => {
    this.setState({ category: value }, this.onSearch);
  };

  onSearch = async () => {
    const { query, category } = this.state;
    this.setState({ isSearching: true });

    const { results } = await getProductsFromCategoryAndQuery(category, query);
    if (results.length === 0) this.setState({ isSearchEmpty: true });
    else this.setState({ products: results, isSearchEmpty: false });
  };

  render() {
    const { onSearch, onQueryChange, onCategoryChange } = this;
    const { query, products, isSearching, isSearchEmpty } = this.state;
    const { onAddToCart, produtoQuantity } = this.props;

    return (
      <div>
        <div className="form-main">
          <Categories onChange={ onCategoryChange } />
          <form className="form-search">
            <input
              className="form-control"
              type="text"
              onChange={ onQueryChange }
              data-testid="query-input"
              value={ query }
            />
            <button
              className="btn btn-primary btn-search"
              type="button"
              onClick={ onSearch }
              data-testid="query-button"
            >
              Pesquisar
            </button>
            <div className="list-products">
              {isSearching ? (
                products.map((props) => (
                  <ProductCard
                    key={ props.id }
                    { ...props }
                    { ...this.state }
                    onAddToCart={ onAddToCart }
                    produtoQuantity={ produtoQuantity }
                  />
                ))
              ) : (
                <p data-testid="home-initial-message">
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </p>
              )}
              {isSearchEmpty && <p>Nenhum produto foi encontrado</p>}
            </div>
          </form>
          <Link to="/cart">
            <BsCart4 data-testid="shopping-cart-button" className="cart" />
            <div data-testid="shopping-cart-size">
              { produtoQuantity }
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  onAddToCart: PropTypes.func,
  produtoQuantity: PropTypes.number,
}.isRequired;
