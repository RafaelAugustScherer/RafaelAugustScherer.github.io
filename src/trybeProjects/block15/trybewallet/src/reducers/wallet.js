// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_EXPENSE, DELETE_EXPENSE, SAVE_COINS } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  total: 0,
};

const wallet = (state = initialState, action) => {
  const expensesCp = [...state.expenses];
  const { formData } = action;

  switch (action.type) {
  case SAVE_EXPENSE:
    if (formData.id - 1 > expensesCp.length) {
      expensesCp.push(formData);
    } else {
      expensesCp[formData.id] = formData;
    }

    return {
      ...state,
      expenses: expensesCp,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: expensesCp.filter(({ id }) => id !== action.id),
    };
  case SAVE_COINS:
    return {
      ...state,
      currencies: [...action.coins],
    };
  default:
    return state;
  }
};

export default wallet;
