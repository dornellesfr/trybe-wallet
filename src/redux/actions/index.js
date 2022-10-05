import { REQUEST_TYPES_COIN,
  RECEIVE_TYPES_COIN_FAILURE,
  RECEIVE_TYPES_COIN_SUCESS,
  SET_EMAIL,
  REQUEST_EXPENSES,
  SET_TOTAL_VALUE,
  DELETE_EXPENSE,
  DECREASE_VALUE,
  EDIT_EXPENSE,
  EDIT_APROVE,
} from './actionTypes';
import fetchApi from '../../services/fetchApi';

// MOEDAS (REQ-3):

const requestTypesCoin = () => ({
  type: REQUEST_TYPES_COIN,
});

const result = (money) => {
  const coinsKeys = Object.keys(money);
  const filteredCoins = coinsKeys.filter((coin) => (coin !== 'USDT'
    ? coin : ''));
  return filteredCoins;
};

const deleteUSDT = (money) => delete money.USDT;

const receiveTypeCoinSucess = (coins) => ({
  type: RECEIVE_TYPES_COIN_SUCESS,
  currencies: result(coins),
  exchangeRates: deleteUSDT(coins),
});

const receiveTypeCoinFailure = (error) => ({
  type: RECEIVE_TYPES_COIN_FAILURE,
  error,
});

export const fetchTypesCoin = () => async (dispatch) => {
  dispatch(requestTypesCoin());

  try {
    const coins = await fetchApi();
    dispatch(receiveTypeCoinSucess(coins));
  } catch (error) {
    dispatch(receiveTypeCoinFailure(error));
  }
};

// EXPENSES:

export const fetchExpenses = (payload) => ({
  type: REQUEST_EXPENSES,
  payload,
});

// OUTRAS:

export const setTotalValue = (payload) => ({
  type: SET_TOTAL_VALUE,
  payload,
});

export function saveEmail(email) {
  return {
    type: SET_EMAIL,
    email,
  };
}

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const decreaseValue = (payload) => ({
  type: DECREASE_VALUE,
  payload,
});

export const editExpense = (expense, editorState) => ({
  type: EDIT_EXPENSE,
  expense,
  editorState,
});

export const editAprove = (expens, editorState, valueTotal) => ({
  type: EDIT_APROVE,
  expens,
  editorState,
  valueTotal,
});
