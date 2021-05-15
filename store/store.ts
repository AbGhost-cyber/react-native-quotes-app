import {
  AsyncThunkAction,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { applyMiddleware, combineReducers } from "redux";
import userListSlice from "./userListSlice";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  userList: userListSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: rootReducer,
  middleware: [ReduxThunk],
});

export default store;
