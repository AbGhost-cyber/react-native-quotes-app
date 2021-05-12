import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userListSlice from "./userListSlice";

const rootReducer = combineReducers({
  userList: userListSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
