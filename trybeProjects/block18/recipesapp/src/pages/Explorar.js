import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import ExplorarCss from '../style/Explorar.module.css';

function Explorar() {
  const history = useHistory();
  return (
    <>
      <Header title="Explorar" />
      <div className={ ExplorarCss.explorar }>
        <button
          type="button"
          data-testid="explore-food"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </button>

        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </button>
      </div>
      <MenuInferior />
    </>
  );
}

export default Explorar;
