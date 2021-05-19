import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Animated,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { Transitioning, TransitioningView } from "react-native-reanimated";

import { QuoteItem } from "../components/QuoteItem";
import { Font, stackSize, TEXT_MAX_LENGTH } from "../constants/constants";
import { Quote } from "../model/Types";
import { useAppSelector, useAppDispatch } from "../store/hooks/hooks";
import { fetchQuotes } from "../store/AsyncActions";
import { transition } from "../components/CustomTransistion";
import { CustomButton } from "../components/CustomButton";
import { BottomTab } from "../components/BottomTab";

const QuoteScreen = () => {
  const _quotes = useAppSelector((state) => state.myQuoteSlice.quotes);
  const dispatch = useAppDispatch();

  const { pro_bold, pro_sans } = Font;

  const [index, setIndex] = useState(0);
  const [error, setError] = useState<undefined | string>();

  const [quotes, setQuotes] = useState<Quote[]>(_quotes);
  const [isLoaded, setIsLoaded] = useState(false);

  const swipeRef = useRef<Swiper<Quote>>(null);
  const transitionRef = useRef<TransitioningView>(null);

  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const quoteIsOutOfBounds = isLoaded
    ? quotes[index].quote.length > TEXT_MAX_LENGTH
    : false;

  useEffect(() => {
    fetchQuotesFromServer(false);
  }, []);

  const fetchQuotesFromServer = useCallback(
    async (shouldFetchFavs: boolean) => {
      setError(undefined);
      const resultAction = await dispatch(fetchQuotes(shouldFetchFavs));
      //if success
      if (fetchQuotes.fulfilled.match(resultAction)) {
        const data = resultAction.payload.quotes;
        setQuotes(data);
      } else if (fetchQuotes.rejected.match(resultAction)) {
        const response = resultAction.payload?.message;
        setError(response);
      }
      setIsLoaded(true);
    },
    [quotes, error, isLoaded]
  );

  const onSwiped = () => {
    transitionRef?.current?.animateNextTransition();
    setIndex((index + 1) % quotes.length);
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 4000,
      useNativeDriver: false,
    }).start();
  };

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={30} />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.swiperContainer}>
          <Swiper
            cards={quotes}
            ref={swipeRef}
            cardIndex={index}
            infinite
            verticalSwipe={false}
            backgroundColor="transparent"
            onSwiped={onSwiped}
            renderCard={(quote) => <QuoteItem quote={quote} />}
            onTapCard={() => swipeRef?.current?.swipeLeft()}
            cardVerticalMargin={50}
            stackScale={10}
            stackSize={stackSize}
            stackSeparation={14}
            animateOverlayLabelsOpacity
            animateCardOpacity
            disableTopSwipe
            disableRightSwipe
          />
        </View>
        <View style={{ justifyContent: "space-evenly", flex: 0.55 }}>
          <Transitioning.View
            ref={transitionRef}
            transition={transition}
            style={[styles.bottomContainerMeta]}
          >
            {quoteIsOutOfBounds && <CustomButton text="Expand" />}
          </Transitioning.View>
        </View>
        <BottomTab />
      </SafeAreaView>
    );
  }
};

export default QuoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  swiperContainer: {
    flex: 0.55,
  },
  bottomContainerMeta: { alignContent: "flex-end", alignItems: "center" },
});
