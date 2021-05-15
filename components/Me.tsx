import React, { useCallback } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../store/hooks/hooks";
import { RootState } from "../store/store";
import { fetchQuoteById, increment } from "../store/userListSlice";

const Me = () => {
  const state = useAppSelector((state) => state.userList);

  const dispatch = useAppDispatch();

  const fetchQuote = useCallback(async () => {
    const response = await dispatch(increment({}));
  }, [state]);

  return (
    <View style={{ flex: 1, marginTop: 30, justifyContent: "center" }}>
      <Text style={{ fontSize: 30, alignSelf: "center" }}>{state.value}</Text>
      <View style={{ flexDirection: "row" }}>
        <Button title="increase" onPress={() => fetchQuote()} />
      </View>
    </View>
  );
};

export default Me;

const styles = StyleSheet.create({});
