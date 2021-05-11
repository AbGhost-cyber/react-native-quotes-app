import React, { useState, useCallback, useRef } from "react";
import { SafeAreaView, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

import Carousel, {
  CarouselProps,
  getInputRangeFromIndexes,
} from "react-native-snap-carousel";

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

const CustomCarousel: React.FC<CustomCarouselProps> = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [carouselItems, setCarouselItems] = useState<ItemProps[]>(array);
  const ref = useRef(null);

  const renderItem = useCallback(({ item, index }: RenderItemProps) => {
    return (
      <LinearGradient
        style={[styles.carousel]}
        colors={["#AABA71", "#47BEC5"]}
        start={{ x: 2, y: 0.2 }}
      />
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Carousel
        layout={"stack"}
        ref={ref}
        data={carouselItems}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index: number) => setActiveIndex(index)}

        // autoplay
        //scrollEnabled={false}
      />
    </SafeAreaView>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  carousel: {
    borderRadius: 12,
    height: height / 1.2,
    padding: 50,
    marginLeft: 15,
    marginRight: 50,
    marginTop: 20,
  },
});
