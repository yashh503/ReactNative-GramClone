import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome6,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";

const profile = () => {
  const theme = useColorScheme(); // Returns 'light' or 'dark'
  const handleLogout = () => {
    router.push("/login");
  };
  const { width, height } = useWindowDimensions();

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: theme === "dark" ? "black" : "white" }}
    >
      <View className="w-full flex-row h-16 justify-between mt-3">
        <View
          className="flex-row justify-center items-center gap-3"
          style={{ marginLeft: 15 }}
        >
          <Feather
            name="lock"
            size={20}
            color={theme === "dark" ? "white" : "black"} // Dynamically apply color
          />
          <Text className="dark:text-white font-bold text-xl">its_meee</Text>
          <SimpleLineIcons
            name="arrow-down"
            size={15}
            color={theme === "dark" ? "white" : "black"}
          />
        </View>
        <View className="flex-row justify-center items-center">
          <TouchableOpacity className="relative">
            <Feather
              name="plus-square"
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
          <TouchableOpacity className="relative">
            <FontAwesome6
              name="bars"
              size={30}
              color={theme === "dark" ? "white" : "black"}
              className="px-5"
            />
            <Entypo
              name="dot-single"
              size={24}
              color="red"
              className="absolute left-10 bottom-5"
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text className="text-gray-900 dark:text-white">Profile</Text>
      <TouchableOpacity
        onPress={handleLogout}
        className="px-5 py-2 border border-black dark:border-white border-r-4 mt-4"
      >
        <AntDesign
          name="logout"
          size={30}
          color={theme === "dark" ? "white" : "black"} // Dynamically apply color
          className="px-5"
        />
      </TouchableOpacity>
    </View>
  );
};

export default profile;
