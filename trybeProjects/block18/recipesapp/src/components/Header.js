import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import BarradeBusca from './BarradeBusca';
import headerCss from '../style/header.module.css';

function Header({ title, comidasOuBebidas }) {
  const [isBusca, setBusca] = useState(false);
  const buscaDisponivel = ['Comidas', 'Bebidas', 'Explorar Origem'];

  return (
    <header className={ headerCss.header }>
      <div className={ headerCss.title_container }>
        <Link to="/perfil" className={ headerCss.profileIcon }>
          <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
        </Link>
        <div data-testid="page-title">
          <p className={ headerCss.title }>{ title }</p>
        </div>
      </div>
      { buscaDisponivel.includes(title) && (
        <>
          <input
            type="image"
            className={ headerCss.searchIcon }
            data-testid="search-top-btn"
            onClick={ () => setBusca(!isBusca) }
            src={ searchIcon }
            alt="search-top-btn"
          />
          {isBusca && <BarradeBusca comidasOuBebidas={ comidasOuBebidas } />}
        </>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  comidasOuBebidas: PropTypes.string,
}.isRequired;

export default Header;
