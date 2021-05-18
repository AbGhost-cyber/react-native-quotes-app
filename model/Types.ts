type Quote = {
  author: string;
  quote: string;
  isFavorite: boolean;
  id: string;
};
type ServerResponse = {
  success: boolean;
  message: string;
};
type QuoteActionType = {
  message: string;
  quoteId: string;
};

type FetchAllQuotesType = {
  quotes: Quote[];
  fetchFavsOnly: boolean;
};

type RequestConfig = {
  method?: "GET" | "POST" | "DELETE";
  headers?: Headers;
  body?: BodyInit;
};

//type of initial state
type UserListState = {
  quotes: Quote[];
  favQuotes: Quote[];
  currentSelectedQuote: Quote | null;
  error?: string;
};

export {
  Quote,
  ServerResponse,
  QuoteActionType,
  FetchAllQuotesType,
  RequestConfig,
  UserListState,
};
