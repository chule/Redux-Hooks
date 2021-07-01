import { getExchangeRates } from "../api";
export const supportedCurrencies = ["USD", "EUR", "JPY", "CAD", "GBP", "MXN"];
const initialState = {
  amount: "12.00",
  currency: "USD",
  currencyData: { USD: 1.0 },
};

export function ratesReducer(state = initialState, action) {
  if (action.type === AMOUNT_CHANGED) {
    return { ...state, amount: action.payload };
  }
  if (action.type === CURRENCY_CODE_CHANGED) {
    return { ...state, currency: action.payload };
  }
  if (action.type === RATES_RECEIVED) {
    return { ...state, currencyData: action.payload };
  }

  return state;
}

// selectors
export const getAmount = (state) => state.rates.amount;
export const getCurrencyCode = (state) => state.rates.currency;
export const getCurrencyData = (state) => state.rates.currencyData;

// action types
export const AMOUNT_CHANGED = "rates/amountChanged";
export const CURRENCY_CODE_CHANGED = "rates/currencyCodeChanged";
export const RATES_RECEIVED = "rates/ratesReceived";

// action creators
export const changeAmount = (value) => ({
  type: AMOUNT_CHANGED,
  payload: value,
});

export const changeCurrencyCode = (currencyCode) => {
  return function changeCurrencyCodeThunk(dispatch) {
    dispatch({
      type: CURRENCY_CODE_CHANGED,
      payload: currencyCode,
    });
    getExchangeRates(currencyCode, supportedCurrencies).then((rates) => {
      dispatch({
        type: RATES_RECEIVED,
        payload: rates,
      });
    });
  };
};

// thunks
export function getInitialRates(dispatch, getState) {
  const state = getState();
  const currencyCode = getCurrencyCode(state);
  dispatch(changeCurrencyCode(currencyCode));
}
