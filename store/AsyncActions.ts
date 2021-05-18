import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL } from "../constants/constants";
import {
  FetchAllQuotesType,
  Quote,
  QuoteActionType,
  RequestConfig,
  ServerResponse,
} from "../model/Types";

/* all async functions here are basically functions that
 * accepts an action type string and a callback
 * and then return a promise which is thunk action creator
 */


// request configs
const getRequestConfig: RequestConfig = {
  method: "GET",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
};
const postRequestConfig: RequestConfig = {
  method: "POST",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
};

const deleteRequestConfig: RequestConfig = {
  method: "DELETE",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
};

export const fetchQuotes = createAsyncThunk<
  FetchAllQuotesType,
  boolean,
  { rejectValue: ServerResponse }
>("quotes/", async (shouldFetchFavs, thunkApi) => {
  const response = await fetch(
    `${SERVER_URL}?fav=${shouldFetchFavs}`,
    getRequestConfig
  );

  if (response.status === 400) {
    return thunkApi.rejectWithValue((await response.json()) as ServerResponse);
  }

  const responseData = (await response.json()) as Quote[];

  const quotes: FetchAllQuotesType = {
    fetchFavsOnly: shouldFetchFavs,
    quotes: responseData,
  };
  return quotes;
});

export const fetchQuoteById = createAsyncThunk<
  Quote,
  string,
  { rejectValue: ServerResponse }
>("quotes/id", async (quoteId, thunkApi) => {
  const response = await fetch(`${SERVER_URL}${quoteId}`, getRequestConfig);

  //if instant error reject
  if (response.status === 400) {
    return thunkApi.rejectWithValue((await response.json()) as ServerResponse);
  }
  const responseData = (await response.json()) as Quote;
  //if response is a quote object, then proceed
  if (isQuote(responseData)) {
    return responseData;
  } else {
    // reject if not quote object but server error object(cast to server response object)
    const res = responseData as ServerResponse;
    return thunkApi.rejectWithValue(res as ServerResponse);
  }
});

//check the type
function isQuote(data: Quote | ServerResponse): data is Quote {
  return (data as Quote).quote !== undefined;
}

export const favoriteQuote = createAsyncThunk<
  QuoteActionType,
  string,
  { rejectValue: ServerResponse }
>("quote/fav/id", async (quoteId, thunkApi) => {
  const response = await fetch(
    `${SERVER_URL}fav/${quoteId}`,
    postRequestConfig
  );

  if (response.status === 400) {
    return thunkApi.rejectWithValue((await response.json()) as ServerResponse);
  }
  const serverResponse = (await response.json()) as ServerResponse;

  if (serverResponse.success && response.ok) {
    const favQuoteRes: QuoteActionType = {
      quoteId: quoteId,
      message: serverResponse.message,
    };
    return favQuoteRes;
  } else {
    return thunkApi.rejectWithValue(serverResponse);
  }
});

export const deleteQuote = createAsyncThunk<
  QuoteActionType,
  string,
  { rejectValue: ServerResponse }
>("quote/delete", async (quoteId, thunkApi) => {
  const response = await fetch(`${SERVER_URL}${quoteId}`, deleteRequestConfig);

  if (response.status === 400) {
    return thunkApi.rejectWithValue((await response.json()) as ServerResponse);
  }
  const serverResponse = (await response.json()) as ServerResponse;

  if (serverResponse.success && response.ok) {
    const quoteAction: QuoteActionType = {
      message: serverResponse.message,
      quoteId,
    };
    return quoteAction;
  } else {
    return thunkApi.rejectWithValue(serverResponse);
  }
});
