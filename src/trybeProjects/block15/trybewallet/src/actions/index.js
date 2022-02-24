// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const SAVE_COINS = 'SAVE_COINS';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const saveExpense = (formData) => ({
  type: SAVE_EXPENSE,
  formData,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const saveCoins = (coins) => ({
  type: SAVE_COINS,
  coins,
});

export const fetchCoins = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  if (json.USDT) delete json.USDT;

  dispatch(saveCoins(Object.keys(json)));

  const exchangeRatesArr = Object.entries(json);
  return exchangeRatesArr.reduce((acc, [key, value]) => (
    { ...acc, [key]: { ...value, name: value.name.replace('/Real Brasileiro', '') } }
  ), {});
};
