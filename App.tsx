import { StatusBar } from "expo-status-bar";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomCarousel from "./CustomCarousel";

export default function App() {
  return <CustomCarousel />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
