import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import { BsCart4 } from 'react-icons/bs';
import getItemById from '../services/SearchById';
import ValuationCard from '../components/ValuationCard';

class Specs extends React.Component {
  constructor() {
    super();

    this.state = {
      itemObj: {},
      valuation: '',
      email: '',
      isButtonDisabled: true,
      valuationsList: [],
      rating: '',
      freeShipping: false,
    };
  }

  componentDidMount = () => this.searchItem();

  searchItem = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const [{ body: itemObj }] = await getItemById(id);
    this.setState({
      itemObj,
      freeShipping: itemObj.shipping.free_shipping,
    });
  };

  handleChanges = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, this.handleButton);
  };

  handleButton = () => {
    const { valuation, email, rating } = this.state;
    if (valuation !== '' && email !== '' && rating !== '') {
      return this.setState({ isButtonDisabled: false });
    }
    this.setState({ isButtonDisabled: true });
  };

  submitValuation = () => {
    const { valuation, email, rating } = this.state;
    const newValuation = { valuation, email, rating };

    this.setState((prev) => ({
      valuationsList: [...prev.valuationsList, newValuation],
      valuation: '',
      email: '',
    }));
  };

  render() {
    const {
      itemObj,
      valuation,
      isButtonDisabled,
      email,
      valuationsList,
      freeShipping,
    } = this.state;
    const { onAddToCart, produtoQuantity } = this.props;
    const { handleChanges, submitValuation } = this;

    return (
      <>
        <p data-testid="product-detail-name">{itemObj.title}</p>
        {freeShipping ? <p data-testid="free-shipping">Frete Grátis</p> : null}
        <FaCartPlus
          onClick={ () => onAddToCart(itemObj) }
          data-testid="product-detail-add-to-cart"
        />
        <form>
          <input type="text" name="email" onChange={ handleChanges } value={ email } />
          <div onChange={ handleChanges }>
            <input type="radio" value="1" name="rating" />
            <input type="radio" value="2" name="rating" />
            <input type="radio" value="3" name="rating" />
            <input type="radio" value="4" name="rating" />
            <input type="radio" value="5" name="rating" />
          </div>
          <textarea
            data-testid="product-detail-evaluation"
            onChange={ handleChanges }
            value={ valuation }
            name="valuation"
          />
          <button type="button" onClick={ submitValuation } disabled={ isButtonDisabled }>
            Avaliar
          </button>
        </form>
        <>
          {valuationsList.map((elem) => (
            <ValuationCard key={ elem.email } valuationInfo={ elem } />
          ))}
        </>
        <Link to="/cart">
          <BsCart4 data-testid="shopping-cart-button" className="cart" />
          <div data-testid="shopping-cart-size">
            { produtoQuantity }
          </div>
        </Link>
      </>
    );
  }
}

Specs.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
  onAddToCart: PropTypes.func,
  produtoQuantity: PropTypes.number,
}.isRequired;

export default Specs;
