import { StatusBar } from "expo-status-bar";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import Me from "./components/Me";
import CustomCarousel from "./CustomCarousel";
import store from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      {/* <CustomCarousel /> */}
      <Me />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
