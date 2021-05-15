import {
  AnyAction,
  CaseReducer,
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { Quote, ServerResponse } from "../model/Models";
import store, { AppDispatch } from "./store";

//type of initial state
export type UserListState = {
  quotes: Quote[];
  loading: boolean;
  error: boolean;
  value: number;
};

export const fetchQuoteById = createAsyncThunk(
  "quotes/fetchById",
  async (quoteId: string) => {
    const response = await fetch(`https://jdjjcjdjd/${quoteId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await response.json()) as Quote;
  }
);

export const Meee = createAction<string>("firstMe");

const initialState: UserListState = {
  quotes: [],
  loading: false,
  error: false,
  value: 0,
};

const userListSlice = createSlice({
  name: "userList",
  initialState: initialState,
  reducers: {
    increment: (state, action: PayloadAction<Quote>) => {
      state.quotes = state.quotes.concat(action.payload);
      state.value += 1;
    },
    decrease: (state) => {
      if (state.value > 0) {
        state.value -= 1;
      }
    },
    clear: (state) => {
      state.value = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuoteById.fulfilled, (state, { payload }) => {
      state.quotes = state.quotes.concat(payload);
    });
    builder.addCase(Meee, (state) => {});
  },
});

export const { increment, decrease, clear } = userListSlice.actions;

export default userListSlice.reducer;
