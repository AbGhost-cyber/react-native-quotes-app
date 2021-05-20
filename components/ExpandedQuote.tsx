import React, { FC, useEffect, useRef } from "react";
import { StyleSheet, Text, Animated } from "react-native";

import { Font } from "../constants/constants";

interface ExpandedQuoteProps {
  text: string;
  id: string;
}

export const ExpandedQuote: FC<ExpandedQuoteProps> = (props) => {
  const animatedHeight = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    handleHeightAnim();
  }, []);

  const handleHeightAnim = () => {
    Animated.timing(animatedHeight, {
      toValue: props.text.length / 1.1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View
      key={props.id}
      style={[styles.expContainer, { height: animatedHeight }]}
    >
      <Text style={styles.expandedText}>{props.text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  expContainer: {
    backgroundColor: "#000",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  expandedText: {
    textAlign: "center",
    paddingHorizontal: 20,
    fontFamily: Font.pro_bold,
    color: "white",
  },
});
