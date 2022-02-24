import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DetailsContext from '../context/DetailsContext';

function BotaoReceita({ url }) {
  const {
    id,
    ingredientes,
    totalIngredientes,
    isInProgress,
    mealsOrCocktails,
    handleFinish,
  } = useContext(DetailsContext);
  const history = useHistory();

  const NOT_STARTED = 'não iniciado';
  const STARTED = 'iniciado';
  const FINISHED = 'finalizado';

  const [progresso, setProgresso] = useState(NOT_STARTED);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (doneRecipes.some(({ id: doneId }) => doneId === id)) {
      setProgresso(FINISHED);
    } else if (inProgressRecipes[mealsOrCocktails()]
    && Object.keys(inProgressRecipes[mealsOrCocktails()]).includes(id)) {
      setProgresso(STARTED);
    } else {
      setProgresso(NOT_STARTED);
    }
  }, [id, mealsOrCocktails]);

  const handleStart = () => {
    const currentStatus = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (!Object.keys(currentStatus[mealsOrCocktails()]).includes(id)) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        { ...currentStatus,
          [mealsOrCocktails()]: { ...currentStatus[mealsOrCocktails()], [id]: [] } },
      ));
    }
    setProgresso(STARTED);
    history.push(`${url}/in-progress`);
  };

  return (
    <div>
      {
        !isInProgress ? (
          progresso !== FINISHED && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
              onClick={ () => handleStart() }
            >
              {
                progresso === NOT_STARTED ? 'Iniciar Receita' : 'Continuar Receita'
              }
            </button>
          )
        ) : (
          <button
            type="button"
            data-testid="finish-recipe-btn"
            className="start-recipe-btn"
            onClick={ () => handleFinish() }
            disabled={ ingredientes.length !== totalIngredientes }
          >
            Finalizar receita
          </button>
        )
      }
    </div>
  );
}

BotaoReceita.propTypes = {
  comidasOuBebidas: PropTypes.string,
  url: PropTypes.string,
}.isRequired;

BotaoReceita.propTypes = {
  isInProgress: PropTypes.string,
  progresso: PropTypes.string,
  url: PropTypes.string,
}.isRequired;

export default BotaoReceita;
