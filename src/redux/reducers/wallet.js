import { REQUEST_TYPES_COIN,
  RECEIVE_TYPES_COIN_FAILURE,
  RECEIVE_TYPES_COIN_SUCESS,
  REQUEST_EXPENSES,
  SET_TOTAL_VALUE,
  DELETE_EXPENSE,
  DECREASE_VALUE,
  EDIT_EXPENSE,
  EDIT_APROVE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isFetching: false,
  error: '',
  totalValue: '0.00',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  const valueTotal = Number(state.totalValue) + Number(action.payload);
  const editExpense = state.expenses.map((expense) => {
    if (expense.id === state.idToEdit) {
      return action.expens;
    } return expense;
  });
  switch (action.type) {
  case REQUEST_TYPES_COIN:
    return { ...state, isFetching: true };
  case RECEIVE_TYPES_COIN_FAILURE:
    return { ...state, error: action.error, isFetching: false };
  case RECEIVE_TYPES_COIN_SUCESS:
    return { ...state, currencies: action.currencies, isFetching: false };
  case REQUEST_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case SET_TOTAL_VALUE:
    return { ...state, totalValue: valueTotal.toFixed(2) };
  case DELETE_EXPENSE:
    return { ...state, expenses: action.payload };
  case DECREASE_VALUE:
    return { ...state, totalValue: action.payload.toFixed(2) };
  case EDIT_EXPENSE:
    return { ...state, editor: action.editorState, idToEdit: action.expense.id };
  case EDIT_APROVE:
    return { ...state,
      expenses: editExpense,
      editor: action.editorState,
      totalValue: action.valueTotal.toFixed(2) };
  default: return state;
  }
};

export default walletReducer;
