import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Toast } from 'react-bootstrap';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import DetailsContext from '../context/DetailsContext';
import useFavorite from '../hooks/useFavorite';
import RecipesContext from '../context/RecipesContext';

function BotaoShareAndFavorite({ id: propId, index, type }) {
  const {
    id: contextId,
    mealsOrCocktails, setShareToast, shareToast } = useContext(DetailsContext);
  const id = contextId || propId;
  const { setFavoriteRecipes } = useContext(RecipesContext);
  const { favorite, handleFavorite } = useFavorite(id);
  let testIdShareBtn = 'share-btn';
  let testIdFavoriteBtn = 'favorite-btn';
  if (typeof index === 'number') {
    testIdShareBtn = `${index}-horizontal-share-btn`;
    testIdFavoriteBtn = `${index}-horizontal-favorite-btn`;
  }
  const favoriteHandleClick = () => {
    if (mealsOrCocktails() === 'meals') {
      handleFavorite('comida');
    } else {
      handleFavorite('bebida');
    }
    const storageFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(storageFavoriteRecipes);
  };
  return (
    <>
      <div>
        <button
          type="button"
          onClick={ () => {
            const { hostname, protocol } = window.location;
            const urlType = type === 'comida' ? 'comidas' : 'bebidas';
            clipboardCopy(`${protocol}//${hostname}:3000/${urlType}/${id}`);
            setShareToast(true);
          } }
        >
          <img data-testid={ testIdShareBtn } src={ shareIcon } alt="share" />
        </button>
        <button
          type="button"
          onClick={ favoriteHandleClick }
        >
          <img
            data-testid={ testIdFavoriteBtn }
            src={ favorite ? blackHeartIcon : whiteHeartIcon }
            alt="favorite"
          />
        </button>
      </div>
      <Toast
        onClose={ () => setShareToast(false) }
        show={ shareToast }
        delay={ 3000 }
        autohide
      >
        <p>Link copiado!</p>
      </Toast>
    </>
  );
}
BotaoShareAndFavorite.propTypes = {
  setShareToast: PropTypes.func,
}.isRequired;
export default BotaoShareAndFavorite;
