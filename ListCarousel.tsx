import React, { FC, useRef } from "react";
import { Animated, StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { StyleSheet, Text, View, Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

const array = [
  "If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt",
  "If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt",
  "If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt",
  "If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt",
  "If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt",
  "If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt",
  "If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt",
  "If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt",
  "If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt",
  "If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt",
  "If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt",
  "If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt",
  "If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt",
  "If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt",
];

const ListCarousel: FC<{ style?: StyleProp<ViewStyle> }> = (props) => {
  const xScroll = useRef(new Animated.Value(0)).current;
  return (
    <View style={[styles.container, props.style]}>
      <Animated.FlatList
        horizontal
        snapToInterval={width}
        decelerationRate={"fast"}
        showsHorizontalScrollIndicator={false}
        data={array}
        style={styles.flatList}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: xScroll } } }],
          {
            useNativeDriver: true,
          }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const outputRange = ["-90deg", "0deg", "90deg"];
          const translateX = xScroll.interpolate({ inputRange, outputRange });
          return (
            <View style={styles.imageContainer}>
              <TouchableOpacity>
                <Animated.Text
                  style={[
                    styles.image,
                    {
                      transform: [{ rotateZ: translateX }],
                      fontSize: 33,
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {item}
                </Animated.Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ListCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: {
    flexGrow: 0,
  },
  imageContainer: {
    width,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 300,
    width: width - 150,
    borderRadius: 20,
  },
});
