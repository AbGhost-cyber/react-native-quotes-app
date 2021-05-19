import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserListState } from "../model/Types";
import {
  deleteQuote,
  favoriteQuote,
  fetchQuoteById,
  fetchQuotes,
} from "./AsyncActions";

//initial state for our slice
const initialState: UserListState = {
  quotes: [],
  favQuotes: [],
  currentSelectedQuote: null,
  error: undefined,
};

const quoteSlice = createSlice({
  name: "quoteSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuoteById.fulfilled, (state, { payload }) => {
      state.currentSelectedQuote = payload;
    });
    builder.addCase(fetchQuoteById.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(fetchQuotes.fulfilled, (state, { payload }) => {
      payload.fetchFavsOnly === true
        ? (state.favQuotes = payload.quotes)
        : (state.quotes = payload.quotes);
    });
    builder.addCase(fetchQuotes.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(favoriteQuote.fulfilled, (state, action) => {
      //check if quote was already favorited
      const wasFavorited = state.favQuotes.find(
        (quote) => quote.id === action.payload.quoteId
      );

      //copy of the state favorited quotes
      let favQuotes = state.favQuotes.slice();
      if (wasFavorited) {
        //get the quote's index
        const quoteIndex = favQuotes.findIndex(
          (quote) => quote.id === action.payload.quoteId
        );
        //remove from the array of fav quotes
        favQuotes.splice(quoteIndex, 1);

        //update fav quotes state
        state.favQuotes = favQuotes;
      } else {
        //insert quote into favorited quotes
        const favQuote = state.quotes.find(
          (quote) => quote.id === action.payload.quoteId
        );

        if (favQuote) {
          favQuotes = favQuotes.concat(favQuote);
        }
        //update our fav quotes
        state.favQuotes = favQuotes;
      }
    });

    builder.addCase(favoriteQuote.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(deleteQuote.fulfilled, (state, { payload }) => {
      state.quotes = state.quotes.filter(
        (quote) => quote.id !== payload.quoteId
      );
    });
    builder.addCase(deleteQuote.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

export default quoteSlice.reducer;
