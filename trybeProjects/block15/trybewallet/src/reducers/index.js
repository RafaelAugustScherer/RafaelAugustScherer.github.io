import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

export default combineReducers({ user, wallet });

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
