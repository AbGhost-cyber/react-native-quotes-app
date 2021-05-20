import React, { FC, useCallback, useState } from "react";
import { StyleSheet, View, Text, ActionSheetIOS, Share } from "react-native";
import Clipboard from "expo-clipboard";

import { FetchType, Quote } from "../model/Types";
import { BottomTab } from "./BottomTab";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { favoriteQuote, fetchQuotes } from "../store/AsyncActions";
import { Font, QUOTE_MAX_LENGTH } from "../constants/constants";

const { pro_bold, pro_sans } = Font;

interface QuoteItemProps {
  quote: Quote;
  fetchFavQuotes: (type: FetchType) => void;
}
interface TruncatedTVProps {
  text: string;
}

const TruncatedTextView: FC<TruncatedTVProps> = (props) => {
  const textToRender = props.text.substring(0, QUOTE_MAX_LENGTH);
  return <Text style={styles.quoteText}>"{textToRender}.....</Text>;
};

export const QuoteItem: FC<QuoteItemProps> = (props) => {
  const dispatch = useAppDispatch();

  const [isFav, setIsFav] = useState(props.quote.isFavorite);
  const [error, setError] = useState<undefined | string>();
  const { id } = props.quote;

  const handleFetchFav = () => {
    props.fetchFavQuotes("Favorites");
  };

  const handleFavoriteQuote = useCallback(async () => {
    setError(undefined);
    const resultAction = await dispatch(favoriteQuote(id));
    if (favoriteQuote.fulfilled.match(resultAction)) {
      console.log(resultAction.payload.message);
    } else if (favoriteQuote.rejected.match(resultAction)) {
      const response = resultAction.payload?.message;
      setError(response);
    }
  }, [error]);

  const handleShareQuote = useCallback(async () => {
    try {
      const result = await Share.share({
        message: `${props.quote.quote} | ${props.quote.author}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          //shared with activity
          alert("thanks for sharing 🐶");
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
        alert("dismissed");
      }
    } catch (error: any) {
      alert(error.message);
    }
  }, []);

  const handleQuoteOptions = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "View Favorites", "Share Quote"],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          //cancel btn
        } else if (buttonIndex === 1) {
          handleFetchFav();
        } else if (buttonIndex === 2) {
          handleShareQuote();
        }
      }
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.quote}>
        {props.quote.quote.length > QUOTE_MAX_LENGTH ? (
          <TruncatedTextView text={props.quote.quote} />
        ) : (
          <Text style={styles.quoteText}>"{props.quote.quote}"</Text>
        )}

        <Text style={styles.quoteAuthor}>{props.quote.author}</Text>
        <View style={{ width: "100%", position: "absolute", bottom: 13 }}>
          <BottomTab
            isHeartPressed={isFav}
            onHeartPress={() => {
              setIsFav((prevState) => !prevState);
              handleFavoriteQuote();
            }}
            onCopyPress={() => Clipboard.setString(props.quote.quote)}
            onMoreOptions={() => handleQuoteOptions()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    flex: 0.5,
  },
  quote: {
    flex: 1,
    borderRadius: 28,
    shadowRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  quoteText: {
    fontFamily: pro_bold,
    fontSize: 32,
    color: "#000",
    paddingHorizontal: 25,
  },
  quoteAuthor: {
    fontFamily: pro_sans,
    fontSize: 12,
    color: "green",
    marginTop: 10,
  },
});
