import { Quote } from "../model/Types";

const SERVER_URL = "http://172.20.10.4:8080/quote/";
const QUOTE_MAX_LENGTH = 70;
const Font = {
  pro_bold: "product-sans-bold",
  pro_sans: "product-sans",
};
const getStackSize = (quotes: Quote[]) => {
  return quotes.length >= 5 ? 5 : quotes.length
};

export { SERVER_URL, Font, getStackSize, QUOTE_MAX_LENGTH };

//http://172.20.10.4:8080/quote/
