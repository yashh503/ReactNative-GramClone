import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";

const HomePageCards = (props: any) => {
  const { item } = props;
  const { width, height } = useWindowDimensions();
  const theme = useColorScheme(); // Returns 'light' or 'dark'
  const handleCheckProfile = () => {
    router.push("/(tabs)/profile");
  };
  const [liked, setLiked] = useState(false);
  // Shared values for heart animation
  const heartScale = useSharedValue(0);
  const heartOpacity = useSharedValue(0);

  // Animated styles
  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
    opacity: heartOpacity.value,
  }));

  const handleDoubleTap = (item: any) => {
    setLiked(true);

    // Run animations sequentially
    heartScale.value = withTiming(1.5, { duration: 200 }, () => {
      heartScale.value = withDelay(200, withTiming(0, { duration: 200 }));
    });
    heartOpacity.value = withTiming(1, { duration: 200 }, () => {
      heartOpacity.value = withDelay(200, withTiming(0, { duration: 200 }));
    });
  };

  return (
    <View
      style={{
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        width: width,
      }}
    >
      <View
        style={{
          width: width,
          backgroundColor: theme === "dark" ? "#000" : "#fff",
        }}
        className="flex flex-col items-center justify-center bg-white  dark:bg-gray-800 "
      >
        <View className="flex-row justify-between items-center h-5 w-full">
          <TouchableOpacity className="flex-row justify-center items-center">
            <Image
              source={{ uri: item?.image }}
              style={{ margin: 5, borderRadius: 100 }}
              width={30}
              height={30}
            />
            <Text className="text-center text-gray-900 dark:text-white">
              {item?.firstName + " " + item?.lastName}
            </Text>
          </TouchableOpacity>
          <View>
            <SimpleLineIcons
              name="options-vertical"
              size={20}
              color={theme === "dark" ? "white" : "black"}
              className="px-5"
            />
          </View>
        </View>
        <View
          className="w-full  border border-gray-200 dark:border-gray-700"
          style={{ height: height / 3 }}
        >
          <TapGestureHandler
            numberOfTaps={2}
            onActivated={() => handleDoubleTap(item)}
          >
            <View style={{ flex: 1 }}>
              <Image
                className="w-full h-full mb-3"
                source={{
                  uri: `https://dummyjson.com/image/400x200/008080?fontFamily=pacifico&text=Hello+i+am+${item?.firstName}&fontSize=27`,
                }}
              />
              <Animated.View
                style={[
                  {
                    position: "absolute",
                    alignSelf: "center",
                    top: "40%",
                    zIndex: 10,
                  },
                  heartStyle,
                ]}
              >
                <AntDesign name="heart" size={50} color="#ffd8d8b0" />
              </Animated.View>
            </View>
          </TapGestureHandler>
        </View>
        <View className="flex-row justify-between items-center h-10 mt-3 w-full">
          <View className="flex-row">
            <TouchableOpacity onPress={() => setLiked(!liked)}>
              <AntDesign
                name={liked ? "heart" : "hearto"}
                size={25}
                color={liked ? "red" : theme === "dark" ? "white" : "black"} // Dynamically apply color
                className="px-2"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome5
                name="comment"
                size={25}
                color={theme === "dark" ? "white" : "black"} // Dynamically apply color
                className="px-2"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather
                name="send"
                size={25}
                color={theme === "dark" ? "white" : "black"} // Dynamically apply color
                className="px-2"
                style={{ transform: "rotate(15deg)" }} // Rotate by 45 degrees
              />
            </TouchableOpacity>
          </View>
          <View className="">
            <FontAwesome
              name="bookmark-o"
              size={24}
              color={theme === "dark" ? "white" : "black"}
              className="px-5"
            />
          </View>
        </View>
        <View className="w-full" style={{ marginLeft: 11, marginTop: 5 }}>
          <Text
            className="text-gray-900 dark:text-white flex-wrap"
            style={{ lineHeight: 20 }}
          >
            <Text
              className="font-bold text-gray-900 dark:text-white"
              onPress={handleCheckProfile}
            >
              {item?.firstName + " " + item?.lastName}
            </Text>
            <Text>{" " + item?.university + " " + item?.userAgent}</Text>
          </Text>
        </View>
        <View className="w-full" style={{ marginLeft: 11 }}>
          <Text className="text-gray-500 dark:text-gray-400">
            DOB: {item.birthDate}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HomePageCards;
