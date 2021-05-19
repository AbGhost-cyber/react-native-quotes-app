import React, { FC } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Font } from "../constants/constants";

interface BottomTabProps {}

interface IconProps {
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size?: number;
  text: string;
}

const CustomIcon: FC<IconProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{ alignItems: "center" }}>
      <Ionicons
        name={props.iconName}
        size={props.size ? props.size : 30}
        color="black"
      />
      <Text
        style={{
          fontFamily: Font.pro_bold,
          color: "#ccc",
          alignSelf: "center",
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export const BottomTab: FC<BottomTabProps> = (props) => {
  return (
    <View style={styles.parent}>
      <CustomIcon iconName="share" onPress={() => {}} text="share" />
      <CustomIcon iconName="ios-heart" onPress={() => {}} text="favorite" />
      <CustomIcon iconName="ios-copy" onPress={() => {}} text="copy" />
      <CustomIcon iconName="ios-menu" onPress={() => {}} text="favorite lists" />
    </View>
  );
};
const styles = StyleSheet.create({
  parent: {
    // flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    margin: 10,
  },
});
