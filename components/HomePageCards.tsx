import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  useColorScheme,
} from "react-native";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  SimpleLineIcons,
} from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import PagerView from "react-native-pager-view";
import { router } from "expo-router";

const HomePageCards = (props: any) => {
  const pagerRef = useRef(null);

  const { item } = props;
  const { width, height } = useWindowDimensions();
  const [currentPage, setCurrentPage] = useState(0);
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
  const handlepagerScroll = (e: any) => {
    console.log(e, "onscorlll");
  };
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

  // Sample images
  const images = [
    `https://cdndailyexcelsior.b-cdn.net/wp-content/uploads/2024/12/PM-MODI-1-scaled.jpg`,
    `https://media.assettype.com/freepressjournal/2024-10-14/l91tkd3f/Snapinsta.app454725563970926751384724749267660446972739n1080.jpg`,
    `https://cdn.britannica.com/48/252748-050-C514EFDB/Virat-Kohli-India-celebrates-50th-century-Cricket-November-15-2023.jpg`,
    `https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQXC-xRTD3uUB4G_Y1hgi-aDaFAywhDrQwp8Vqu8lMd0HIXAc5M-PvODMmItsYoqrbcXSVB-hp8mZ6s_p7hr9bvlA`,
    `https://www.aljazeera.com/wp-content/uploads/2024/11/WIDE-THUMBNAIL-1731158859.jpg?resize=730%2C410&quality=80`,
  ];
  const randomIndex = Math.floor(Math.random() * images.length);
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
        className="flex flex-col items-center justify-center bg-white dark:bg-gray-800"
      >
        <View className="flex-row justify-between items-center h-5 w-full">
          <TouchableOpacity className="flex-row justify-center items-center">
            <Image
              source={{
                uri: `https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQqRvaO1nKlV_RwVvz3gm9ME_TCXqKzCn-etjQCTD1-S-eJtaVCMJ-aRGvNJyWQHpvl67XSvFU5DFybcSSs4W9PvA1CqlQ2pdyijVYC_A`,
              }}
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
        <View className="w-full" style={{ height: height / 3 }}>
          <TapGestureHandler
            numberOfTaps={2}
            onActivated={() => handleDoubleTap(item)}
          >
            <View style={{ flex: 1 }}>
              <PagerView
                ref={pagerRef}
                style={{ flex: 1 }}
                initialPage={0}
                onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
                overdrag={true}
                scrollEnabled={true}
                overScrollMode={"always"}
                orientation={"horizontal"}
              >
                {images.map((uri, index) => (
                  <Image
                    key={index}
                    className="w-full h-full"
                    source={{ uri }}
                    height={100}
                  />
                ))}
              </PagerView>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          {images.map((_, index) => (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                marginHorizontal: 4,
                backgroundColor:
                  currentPage === index
                    ? theme === "dark"
                      ? "#fff"
                      : "#000"
                    : "#ccc",
              }}
            />
          ))}
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
