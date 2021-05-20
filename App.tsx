import { StatusBar } from "expo-status-bar";
import React, { FC, useState } from "react";

import { Provider } from "react-redux";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import store from "./store/store";
import QuoteScreen from "./screen/QuoteScreen";


const fetchFonts = () => {
  return Font.loadAsync({
    "product-sans-bold": require("./assets/fonts/product-sans-bold.ttf"),
    "product-sans": require("./assets/fonts/product-sans.ttf"),
  });
};

export default function App() {
  const [fontIsLoaded, setFontIsLoaded] = useState<boolean>(false);

  if (!fontIsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontIsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <QuoteScreen />
    </Provider>
  );
}
