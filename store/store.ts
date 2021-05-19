import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import quoteSlice from "./userListSlice";

const rootReducer = combineReducers({
  myQuoteSlice: quoteSlice,
});

//typeof our reducer state
export type RootState = ReturnType<typeof rootReducer>;

//type of our store dispatch 
export type AppDispatch = typeof store.dispatch;

//our redux store...with configureStore, redux-thunk is enabled
const store = configureStore({
  reducer: rootReducer,
});

export default store;
