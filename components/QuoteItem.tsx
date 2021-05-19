import React, { FC, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Font, TEXT_MAX_LENGTH } from "../constants/constants";

import { Quote } from "../model/Types";

const { pro_bold, pro_sans } = Font;

const { height, width } = Dimensions.get("window");

interface QuoteItemProps {
  quote: Quote;
}
interface TruncatedTV {
  text: string;
}

const TruncatedTextView: FC<TruncatedTV> = (props) => {
  const textToRender = props.text.substring(0, TEXT_MAX_LENGTH);
  return <Text style={styles.quoteText}>{textToRender}.....</Text>;
};

export const QuoteItem: FC<QuoteItemProps> = (props) => {
  // const [showMore, setShowMore] = useState()
  return (
    <View style={styles.card}>
      <View style={styles.quote}>
        {props.quote.quote.length > TEXT_MAX_LENGTH ? (
          <TruncatedTextView text={props.quote.quote} />
        ) : (
          <Text style={styles.quoteText}>{props.quote.quote}</Text>
        )}

        <Text style={styles.quoteAuthor}>{props.quote.author}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    flex: 1,
    height: height * 1.2,
  },
  quote: {
    width: "100%",
    flex: 0.45,
    borderRadius: 8,
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
    color: "#877F71",
    marginTop: 10,
  },
});
