import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';

class ProductCard extends Component {
  render() {
    const itemObj = this.props;
    const {
      title,
      price,
      thumbnail,
      id,
      shipping: { free_shipping: freeShipping } } = this.props;
    const { onAddToCart } = this.props;

    return (
      <div data-testid="product">
        <Link data-testid="product-detail-link" to={ `/specs/${id}` }>
          <p>{ title }</p>
          <img src={ thumbnail } alt={ title } />
          <p>{ price }</p>
          { freeShipping ? <p data-testid="free-shipping">Frete Grátis</p> : null }
        </Link>
        <FaCartPlus
          onClick={ () => onAddToCart(itemObj) }
          data-testid="product-add-to-cart"
        />
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  thumbnail: PropTypes.string,
  id: PropTypes.string,
  onAddToCart: PropTypes.func,
}.isRequired;

export default ProductCard;
