import React, { useCallback } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppSelector, useAppDispatch } from "../store/hooks/hooks";
import { RootState } from "../store/store";
import { increment, decrease, clear } from "../store/userListSlice";

const Me = () => {
  const state = useAppSelector((state) => state.userList);
  const dispatch = useAppDispatch();

  const increaseNumber = useCallback(() => {
    dispatch(increment());
  }, [state]);
  const decreaseNumber = useCallback(() => {
    dispatch(decrease());
  }, [state]);
  const clearNumber = useCallback(() => {
    dispatch(clear());
  }, [state]);

  return (
    <View style={{ flex: 1, marginTop: 30, justifyContent: "center" }}>
      <Text style={{ fontSize: 30, alignSelf: "center" }}>{state.value}</Text>
      <View style={{ flexDirection: "row" }}>
        <Button title="increase" onPress={() => increaseNumber()} />
        <Button title="Decrease" onPress={() => decreaseNumber()} />
        <Button title="Clear" onPress={() => clearNumber()} />
      </View>
    </View>
  );
};

export default Me;

const styles = StyleSheet.create({});
