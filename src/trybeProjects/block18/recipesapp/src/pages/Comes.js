import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import CategoryFilters from '../components/CategoryFilters';
import MenuInferior from '../components/MenuInferior';

function Comes() {
  const { comidas, setComidas, comidasBackup } = useContext(RecipesContext);

  useEffect(() => () => {
    setComidas(undefined);
  }, [setComidas]);

  return (
    <>
      <Header title="Comidas" comidasOuBebidas="comidas" />
      <div className="meals">
        <CategoryFilters comidasOuBebidas="comidas" />
        {
          (comidas || comidasBackup).map((comida, index) => {
            const { id, name, image } = comida;
            const MAX_LENGTH = 12;
            if (index < MAX_LENGTH) {
              return (
                <Card
                  key={ name }
                  thumb={ image }
                  name={ name }
                  index={ index }
                  id={ id }
                  url="comidas"
                />
              );
            }
            return null;
          })
        }
      </div>
      <MenuInferior />
    </>

  );
}

export default Comes;
