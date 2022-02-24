import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Categories from './Categories';
import ProductCard from './ProductCard';

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
    const { onAddToCart } = this.props;

    return (
      <div>
        <Categories onChange={ onCategoryChange } />
        <form>
          <input
            type="text"
            onChange={ onQueryChange }
            data-testid="query-input"
            value={ query }
          />
          <button type="button" onClick={ onSearch } data-testid="query-button">
            Pesquisar
          </button>
        </form>
        <Link to="/cart">
          <button type="button" data-testid="shopping-cart-button">
            carrinho de compras
          </button>
        </Link>
        {isSearching ? (
          products.map((props) => (
            <ProductCard
              key={ props.id }
              { ...props }
              { ...this.state }
              onAddToCart={ onAddToCart }
            />
          ))
        ) : (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}
        {isSearchEmpty && <p>Nenhum produto foi encontrado</p>}
      </div>
    );
  }
}

Home.propTypes = {
  onAddToCart: PropTypes.func,
}.isRequired;
