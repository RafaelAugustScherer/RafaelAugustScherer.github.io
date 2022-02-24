import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from '../style/MenuInferior.module.css';

function MenuInferior() {
  return (

    <footer data-testid="footer" className={styles.menuInferior}>
      <Link to="/bebidas">
        <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="drink icon" />
      </Link>
      <Link to="/explorar">
        <img src={ exploreIcon } alt="explore icon" data-testid="explore-bottom-btn" />
      </Link>
      <Link to="/comidas">
        <img src={ mealIcon } alt="meal icon" data-testid="food-bottom-btn" />
      </Link>

    </footer>
  );
}
export default MenuInferior;
