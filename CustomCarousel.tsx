import React, { useState, useCallback, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

import Carousel, {
  CarouselProps,
  getInputRangeFromIndexes,
} from "react-native-snap-carousel";
import ListCarousel from "./ListCarousel";
import Me from "./components/Me";
import FavButton from "./components/FavButton";

interface ItemProps {
  title: string;
  text: string;
}

interface CustomCarouselProps {}

interface RenderItemProps {
  item: ItemProps;
  index: number;
}

const array = [...new Array(100)];

// index % 2 === 0
// ? styles.carousel
// : index % 3 === 0
// ? { ...styles.carousel, transform: [{ rotate: "-7deg" }] }
// : { ...styles.carousel, transform: [{ rotate: "7deg" }] }

const CustomCarousel: React.FC<CustomCarouselProps> = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [carouselItems, setCarouselItems] = useState<ItemProps[]>(array);
  const ref = useRef(null);

  const renderItem = useCallback(({ item, index }: RenderItemProps) => {
    return (
      <LinearGradient
        style={styles.carousel}
        colors={["#757984", "#424859"]}
        start={{ x: 1, y: 0.2 }}
      >
        <Text style={{ fontSize: 33, fontWeight: "bold", color: "white" }}>
          "If life were predictable it would cease to be life, and be without
          flavor. -Eleanor Roosevelt",
        </Text>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              flex: 1,
              marginEnd: 20,
            }}
          >
            <Ionicons
              name="share-social"
              size={23}
              color="#adabaa"
              style={{ paddingHorizontal: 30 }}
            />
            <FavButton />
            <Ionicons
              name="cloud-upload"
              size={23}
              color="#adabaa"
              style={{ paddingHorizontal: 30 }}
            />
          </View>
        </View>
      </LinearGradient>
    );
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#2D2D39",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Carousel
        layout={"stack"}
        ref={ref}
        data={carouselItems}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index: number) => setActiveIndex(index)}
        

        // autoplay
      />

      {/* <View
        style={{
          //  justifyContent: "space-around",
          alignItems: "flex-end",
          flexDirection: "row",
          flex: 1,
          padding: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "flex-end", flex: 1 }}>
          <Ionicons
            name="ios-share-outline"
            size={30}
            style={{ marginRight: 30 }}
            color="#ccc"
          />
          <Ionicons
            name="trash-outline"
            size={30}
            style={{ marginStart: 30 }}
            color="#ccc"
          />
        </View>
        <Text style={{ fontWeight: "700", fontSize: 16, color: "#ccc" }}>
          3/12
        </Text>
      </View> */}
    </View>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  carousel: {
    borderRadius: 10,
    height: height / 1.4,
    padding: 50,
    marginLeft: 10,
    marginRight: 50,
    top: "15%",
  },
  circle: {
    padding: 20,
    // borderRadius: 100,
    marginStart: 30,
    borderRadius: 20,
  },
});
