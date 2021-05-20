import React, { FC } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Font } from "../constants/constants";

interface BottomTabProps {
  onMoreOptions: () => void;
  onCopyPress: () => void;
  onHeartPress: () => void;
  isHeartPressed: boolean;
}

export interface IconProps {
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size?: number;
  color?: string;
}

const CustomIcon: FC<IconProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{ alignItems: "center" }}>
      <Ionicons
        name={props.iconName}
        size={props.size ? props.size : 30}
        color={props.color ? props.color : "black"}
      />
    </TouchableOpacity>
  );
};

export const BottomTab: FC<BottomTabProps> = (props) => {
  return (
    <View style={styles.parent}>
      <CustomIcon
        iconName="ios-list-outline"
        onPress={() => props.onMoreOptions()}
      />
      <CustomIcon
        iconName={props.isHeartPressed ? "ios-heart" : "ios-heart-outline"}
        onPress={() => props.onHeartPress()}
        color = "#EC2379"
      />
      <CustomIcon
        iconName="ios-copy-outline"
        onPress={() => props.onCopyPress()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  parent: {
    // flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
});
