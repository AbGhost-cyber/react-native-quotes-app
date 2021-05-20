import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Font } from "../constants/constants";

interface CustomButtonProps {
  text: string;
  onPress: () => void;
}

export const CustomButton: FC<CustomButtonProps> = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    margin: 10,
    padding: 21,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    width: 150,
  },
  text: {
    fontSize: 15,
    fontFamily: Font.pro_sans,
    color: "white",
  },
});
