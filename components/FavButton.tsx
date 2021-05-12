import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FavButton = () => {
  return (
    <TouchableOpacity style={{ flexDirection: "row" }}>
      <LinearGradient
        style={styles.circle}
        colors={["#eba391", "#DF483F"]}
        start={{ x: 1, y: 0.5 }}
      ></LinearGradient>
      <Ionicons
        name="ios-heart-outline"
        size={22}
        color="#ccc"
        style={{ position: "absolute", left: 9, alignSelf: "center" }}
      />
    </TouchableOpacity>
  );
};

export default FavButton;

const styles = StyleSheet.create({
  circle: {
    padding: 20,
    // borderRadius: 100,
    borderRadius: 20,
  },
});
