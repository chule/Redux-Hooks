import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { ratesReducer } from "./rates";
import { userReducer } from "./user";

export const store = createStore(
  combineReducers({ rates: ratesReducer, user: userReducer }),
  applyMiddleware(thunk)
);
