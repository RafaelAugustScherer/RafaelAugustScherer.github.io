import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './pages/Login.css';
import './pages/Comes.css';
import Login from './pages/Login';
import Comes from './pages/Comes';
import RecipesProvider from './context/RecipesProvider';
import Bebes from './pages/Bebes';
import Detalhes from './pages/Detalhes';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarComidasArea from './pages/ExplorarComidasArea';
import ExplorarComidasIngrediente from './pages/ExplorarComidasIngrediente';
import ExplorarBebidasIngrediente from './pages/ExplorarBebidasIngrediente';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import DetailsProvider from './context/DetailsProvider';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <RecipesProvider>
        <DetailsProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ Comes } />
            <Route exact path="/bebidas" component={ Bebes } />

            <Route exact path="/comidas/:id" component={ Detalhes } />
            <Route exact path="/bebidas/:id" component={ Detalhes } />
            <Route exact path="/comidas/:id/in-progress" component={ Detalhes } />
            <Route exact path="/bebidas/:id/in-progress" component={ Detalhes } />

            <Route exact path="/perfil" component={ Perfil } />
            <Route exact path="/explorar" component={ Explorar } />
            <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
            <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
            <Route
              exact
              path="/explorar/comidas/area"
              component={ ExplorarComidasArea }
            />
            <Route
              exact
              path="/explorar/comidas/ingredientes"
              component={ ExplorarComidasIngrediente }
            />
            <Route
              exact
              path="/explorar/bebidas/ingredientes"
              component={ ExplorarBebidasIngrediente }
            />
            <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
            <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
            <Route path="/*" component={ NotFound } />
          </Switch>
        </DetailsProvider>
      </RecipesProvider>
    </BrowserRouter>
  );
}

export default App;
