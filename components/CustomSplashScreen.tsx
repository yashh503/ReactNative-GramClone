import { View, Text, Image, useWindowDimensions } from "react-native";
import React from "react";

const CustomSplashScreen = () => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../assets/images/splash.png")}  // Correct way to use local images
        style={{ width: width, height: height }}
      />
    </View>
  );
};

export default CustomSplashScreen;
