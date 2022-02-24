import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import UseRecipe from '../hooks/UseRecipe';
import Come from '../components/Come';
import Bebe from '../components/Bebe';
import BotaoReceita from '../components/BotaoReceita';
import DetailsContext from '../context/DetailsContext';
import RecipesContext from '../context/RecipesContext';
import DetalhesCss from '../style/Detalhes.module.css';


function Detalhes({ match: { url } }) {
  const {
    setRefeicao,
    setIngredientes,
    setRecomendadas,
    setId,
    setIsInProgress } = useContext(DetailsContext);
  const { startLocalStorage } = useContext(RecipesContext);
  const [, comidasOuBebidas, urlId, progressUrl] = url.split('/');

  const MAX_LENGTH = 6;
  const { fetchRecipes, fetchRecipeById } = UseRecipe(MAX_LENGTH);
  const [isLoading, setIsLoading] = useState(false);

  startLocalStorage();

  const getRecipeStatus = () => {
    const { cocktails, meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (comidasOuBebidas === 'comidas' && Object.keys(meals).includes(urlId)) {
      setIngredientes(meals[urlId]);
    } else if (comidasOuBebidas === 'bebes' && Object.keys(cocktails).includes(urlId)) {
      setIngredientes(cocktails[urlId]);
    }
  };

  const fetchRecipe = async () => {
    setIsLoading(true);
    const newRefeicao = await fetchRecipeById(comidasOuBebidas, urlId);
    const newRecomendadas = await fetchRecipes(
      comidasOuBebidas === 'comidas' ? 'bebidas' : 'comidas',
    );
    setRefeicao(newRefeicao);
    setRecomendadas(newRecomendadas);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRecipe();
    getRecipeStatus();
    setIsInProgress(progressUrl);
    setId(urlId);

    // eslint-disable-next-line
  }, [url]);

  useEffect(() => {
    setIsInProgress(progressUrl);
  }, [progressUrl, setIsInProgress]);

  return (
    <div className={ DetalhesCss.container }>
      {
        comidasOuBebidas === 'comidas'
          ? <Come isLoading={ isLoading } /> : <Bebe isLoading={ isLoading } />
      }
      <BotaoReceita url={ url } comidasOuBebidas={ comidasOuBebidas } />
    </div>
  );
}

Detalhes.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Detalhes;
