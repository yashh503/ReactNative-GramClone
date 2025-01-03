import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  useColorScheme,
  Alert,
  BackHandler,
} from "react-native";
import { fetchData } from "../../redux/actions";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useFonts } from "expo-font";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { ScrollView } from "react-native-virtualized-view";
import {
  PanGestureHandler,
  GestureHandlerRootView,
  GestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Entypo, SimpleLineIcons } from "@expo/vector-icons";
import HomePageCards from "@/components/HomePageCards";
import HomePageStories from "@/components/HomePageStories";

export default function Index() {
  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };
  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
      };
    }, [])
  );
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const translateX = useSharedValue(0); // Shared value for animation
  const translateY = useSharedValue(0); // Shared value for animation
  const selfStory = {
    image:
      "https://dummyjson.com/image/400x200/008080?fontFamily=pacifico&text=Hello+i+am+ME&fontSize=27", // Replace with your self-image URL
    role: "self", // Role as "self"
  };
  const { width, height } = useWindowDimensions();
  const [dataSet, setDataSet] = useState([]);
  const [storiesData, setStoriesData] = useState<any>([]);
  const fetchDataAndLog = async () => {
    try {
      const data = await fetchData(); // Call the imported async function
      setDataSet(data); // Log the fetched data
      const transformedData = data.map((item: any) => ({
        id: item.id,
        image: item.image,
        role: item.role,
      }));
      const updatedData = [selfStory, ...transformedData];
      setStoriesData(updatedData);
    } catch (error) {
      console.error("Error fetching data:", error); // Handle any errors
    }
  };

  // const onGestureEvent = (event: GestureHandlerStateChangeEvent) => {
  //   const { translationX, state } = event.nativeEvent as any;

  //   // Check if the gesture has ended (State.END)
  //   if (state === State.END) {
  //     if (translationX > 100) {
  //       // Swiped right, navigate to another route
  //       translateX.value = 0;
  //       router.push("/camera"); // Use router.push for navigation
  //     } else if (translationX < -100) {
  //       // Swiped left, navigate to camera
  //       translateX.value = 0;
  //       router.push("/message"); // Use router.push to open the camera screen
  //     } else {
  //       translateX.value = 0; // Reset position for incomplete swipe
  //     }
  //   } else {
  //     translateX.value = translationX; // Update animation value
  //   }
  // };
  const [oldv, setOldV] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(80); // Normal header height
  const onScroll = (event: any) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y; // Get current scroll position
    // If scroll down, hide the header
    if (contentOffsetY < oldv) {
      // If scroll up, show the header
      translateY.value = withTiming(0, { duration: 300 });
      setHeaderHeight(80); // Set to normal height
    } else if (contentOffsetY > 10) {
      translateY.value = withTiming(-80, { duration: 300 });
      setHeaderHeight(0); // Set height to 0 when hidden
    } else {
      translateY.value = withTiming(0, { duration: 300 });
      setHeaderHeight(80); // Default normal height when at top
    }
    setOldV(contentOffsetY); // Update scroll position
  };

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    height: headerHeight, // Dynamically change height
  }));

  useEffect(() => {
    fetchDataAndLog();
  }, []);
  const handleOpenmsj = () => {
    router.push("/message");
  };
  const handleOpencamera = () => {
    router.push("/camera");
  };
  const handleOpenLikes = () => {
    router.push("/likes");
  };
  const theme = useColorScheme(); // Returns 'light' or 'dark'
  return (
    <View
      style={{ flex: 1, backgroundColor: theme === "dark" ? "#000" : "#fff" }}
    >
      {/* Header of page start */}
      <View className="w-full flex-row  justify-between mt-3">
        <Image
          source={
            theme === "dark"
              ? require("../../assets/images/logo.png")
              : require("../../assets/images/logo.png")
          }
          resizeMode="contain"
          style={{ width: width / 4, height: 60 }}
        />
        <View className="flex-row h-16 justify-center items-center">
          <TouchableOpacity onPress={handleOpenLikes} className="relative">
            <AntDesign
              name="hearto"
              size={30}
              color={theme === "dark" ? "white" : "black"} // Dynamically apply color
              className="px-5"
            />
            <Entypo
              name="dot-single"
              size={24}
              color="red"
              className="absolute left-10 bottom-5"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenmsj} className="relative">
            <AntDesign
              name="message1"
              size={30}
              color={theme === "dark" ? "white" : "black"}
              className="px-5"
            />
            <View className="absolute left-8 bottom-6 bg-red-500 rounded-full px-2 py-1">
              <Text className="text-sm text-white">10</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* Header of page end */}
      <ScrollView style={{ flex: 1 }} scrollEventThrottle={17}>
        <View>
          <FlatList
            data={storiesData}
            horizontal
            style={{
              marginBottom: 10,
              marginLeft: 10,
              marginRight: 10,
            }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }: { item: any }) => {
              return <HomePageStories item={item} />;
            }}
          />
        </View>
        {/* <PagerView style={{ flex: 1 }} initialPage={0}> */}

        <View style={{ flex: 1 }}>
          <FlatList
            data={dataSet}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: any }) => {
              return <HomePageCards item={item} />;
            }}
          />
        </View>
        {/* </PagerView> */}
      </ScrollView>
    </View>
  );
}
