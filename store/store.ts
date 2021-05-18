import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import quoteSlice from "./userListSlice";

const rootReducer = combineReducers({
  userList: quoteSlice,
});

//typeof our reducer state
export type RootState = ReturnType<typeof rootReducer>;

//type of our store dispatch 
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
