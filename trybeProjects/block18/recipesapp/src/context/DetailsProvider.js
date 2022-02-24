import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import DetailsContext from './DetailsContext';

function DetailsProvider({ children }) {
  const [ingredientes, setIngredientes] = useState([]);
  const [totalIngredientes, setTotalIngredientes] = useState(0);
  const [refeicao, setRefeicao] = useState({});
  const [recomendadas, setRecomendadas] = useState([]);
  const [id, setId] = useState('');
  const [isInProgress, setIsInProgress] = useState('');
  const [shareToast, setShareToast] = useState(false);
  const history = useHistory();

  const mealsOrCocktails = useCallback(() => {
    // const { meals, cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (Object.keys(refeicao).length === 0) return {};
    if (refeicao.strAlcoholic) return 'cocktails';
    return 'meals';
  }, [refeicao]);

  const handleFinish = () => {
    const prevDone = JSON.parse(localStorage.getItem('doneRecipes'));
    const prevInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

    const date = new Date();
    const doneDate = `${date.getDate()}/${(date.getMonth()) + 1}/${date.getFullYear()}`;
    const {
      name,
      image,
      alcoholicOrNot,
      strArea: area,
      strCategory: category,
      strTags } = refeicao;

    const type = mealsOrCocktails() === 'meals' ? 'comida' : 'bebida';
    const tags = strTags ? strTags.split(',') : [];
    const newDone = {
      id,
      name,
      image,
      type,
      area,
      category,
      tags,
      alcoholicOrNot,
      doneDate,
    };
    localStorage.setItem('doneRecipes', JSON.stringify([...prevDone, newDone]));

    delete prevInProgress[mealsOrCocktails()][id];
    localStorage.setItem('inProgressRecipes', JSON.stringify(prevInProgress));

    history.push('/receitas-feitas');
  };

  const contextValue = {
    ingredientes,
    setIngredientes,
    totalIngredientes,
    setTotalIngredientes,
    refeicao,
    setRefeicao,
    recomendadas,
    setRecomendadas,
    isInProgress,
    setIsInProgress,
    id,
    setId,
    mealsOrCocktails,
    shareToast,
    setShareToast,
    handleFinish,
  };

  return (
    <DetailsContext.Provider value={ contextValue }>
      { children }
    </DetailsContext.Provider>
  );
}

DetailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsProvider;
