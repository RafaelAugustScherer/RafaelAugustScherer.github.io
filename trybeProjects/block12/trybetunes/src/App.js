import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import './App.css';

class App extends Component {
  render() {
    const pagesObj = [
      {
        path: '/search',
        component: Search,
      },
      {
        path: '/album/:id',
        component: Album,
      },
      {
        path: '/favorites',
        component: Favorites,
      },
      {
        path: '/profile',
        component: Profile,
      },
      {
        path: '/profile/edit',
        component: ProfileEdit,
      },
    ];
    return (
      <HashRouter>
        <Switch>
          {
            pagesObj.map(({ path, component }, idx) => (
              <Route key={ idx } exact path={ path }>
                <Header currentPage={ path } />
                <Route component={ component } />
              </Route>
            ))
          }
          <Route exact path="/" component={ Login } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
