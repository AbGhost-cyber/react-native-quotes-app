type Quote = {
  author: string;
  quote: string;
  isFavorite: boolean;
  id: string;
};
type ServerResponse = {
  success: boolean;
  data: string;
};

export { Quote, ServerResponse };
