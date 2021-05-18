import React, { useCallback, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { deleteQuote, fetchQuoteById, fetchQuotes } from "../store/AsyncActions";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";

const Me = () => {
  const state = useAppSelector((state) => state.userList);
  const favQuotes = useAppSelector((state) => state.userList.favQuotes);

  useEffect(() => {
    fetchAllQuotes(false);
    fetchAllQuotes(true);
  }, []);

  const dispatch = useAppDispatch();

  const fetchQuote = useCallback(async () => {
    const resultAction = await dispatch(
      // fetchQuoteById("609cd870cf19123aaad6d185") as unknown as AnyAction
      //  favoriteQuote("609cd870cf19123aaad6d185") as unknown as AnyAction
      fetchQuoteById("609cd870cf19123aaad6d185")
    );

    if (fetchQuoteById.fulfilled.match(resultAction)) {
      const info = resultAction.payload;
      console.log(info);
    } else if (fetchQuoteById.rejected.match(resultAction)) {
      const rej = resultAction.payload?.message;
      console.log(rej);
    }
  }, []);

  const fetchAllQuotes = useCallback(async (fetchFavs: boolean) => {
    const response = await dispatch(
      fetchQuotes(fetchFavs) as unknown as AnyAction
    );
  }, []);

  return (
    <View style={{ flex: 1, marginTop: 30, justifyContent: "center" }}>
      <Text style={{ fontSize: 30, alignSelf: "center" }}>
        {favQuotes.length}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Button title="increase" onPress={() => fetchQuote()} />
      </View>
    </View>
  );
};

export default Me;

const styles = StyleSheet.create({});
