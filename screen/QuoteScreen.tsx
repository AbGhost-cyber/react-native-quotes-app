import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Animated,
  Dimensions,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Transitioning, TransitioningView } from "react-native-reanimated";

import { QuoteItem } from "../components/QuoteItem";
import { Font, getStackSize, QUOTE_MAX_LENGTH } from "../constants/constants";
import { FetchType, Quote } from "../model/Types";
import { useAppSelector, useAppDispatch } from "../store/hooks/hooks";
import { fetchQuotes } from "../store/AsyncActions";
import { transition } from "../components/CustomTransistion";
import { CustomButton } from "../components/CustomButton";
import { ExpandedQuote } from "../components/ExpandedQuote";

const { width } = Dimensions.get("window");

const QuoteScreen = () => {
  const _quotes = useAppSelector((state) => state.myQuoteSlice.quotes);
  const _favQuotes = useAppSelector((state) => state.myQuoteSlice.favQuotes);
  const dispatch = useAppDispatch();

  const [index, setIndex] = useState(0);
  const [error, setError] = useState<undefined | string>();

  const [fetchType, setFetchType] = useState<FetchType>("All");
  const [quotes, setQuotes] = useState<Quote[]>(
    fetchType === "All" ? _quotes : _favQuotes
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [showExpanded, setShowExpanded] = useState(false);

  const swipeRef = useRef<Swiper<Quote>>(null);
  const transitionRef = useRef<TransitioningView>(null);

  let quoteIsOutOfBounds =
    isLoaded && quotes.length > 0
      ? quotes[index].quote.length > QUOTE_MAX_LENGTH
      : false;

  useEffect(() => {
    fetchQuotesFromServer(fetchType);
  }, [fetchType]);

  const fetchQuotesFromServer = useCallback(
    async (fetchType: FetchType) => {
      const getType = fetchType === "All" ? false : true;
      setError(undefined);
      setIsLoaded(false);
      const resultAction = await dispatch(fetchQuotes(getType));
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
    [quotes, error, isLoaded, fetchType]
  );

  const onSwiped = () => {
    setShowExpanded(false);
    transitionRef?.current?.animateNextTransition();
    setIndex((index + 1) % quotes.length);
  };

  if (!isLoaded) {
    return (
      <View style={styles.emptyParent}>
        <ActivityIndicator size={30} />
      </View>
    );
  } else if (quotes.length <= 0) {
    return (
      <View style={styles.emptyParent}>
        <Text style={styles.emptyText}>No Quotes Found</Text>
        <CustomButton
          text="View All Quotes"
          onPress={() => {
            setFetchType("All");
          }}
        />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={[styles.container]}>
        <MaterialCommunityIcons
          name="crop-square"
          size={width}
          color="#0070FF"
          style={{
            opacity: 0.05,
            transform: [{ rotate: "45deg" }, { scale: 1.6 }],
            position: "absolute",
            left: -15,
            top: 30,
          }}
        />
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
            renderCard={(quote) => (
              <QuoteItem
                quote={quote}
                fetchFavQuotes={(type) => {
                  setFetchType(type);
                  setIndex(0);
                  fetchQuotesFromServer(type);
                }}
              />
            )}
            onTapCard={() => swipeRef?.current?.swipeLeft()}
            cardVerticalMargin={50}
            stackScale={10}
            stackSize={getStackSize(quotes)}
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
            {quoteIsOutOfBounds && (
              <CustomButton
                text={showExpanded ? "Collapse Quote" : "Expand Quote"}
                onPress={() => {
                  setShowExpanded(!showExpanded);
                }}
              />
            )}
          </Transitioning.View>
        </View>
        {quoteIsOutOfBounds && showExpanded && (
          <ExpandedQuote id={quotes[index].id} text={quotes[index].quote} />
        )}
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

  emptyParent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 22,
    fontFamily: Font.pro_bold,
  },
});
