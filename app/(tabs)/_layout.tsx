import { View, Text, useColorScheme } from "react-native";
import React, { useEffect } from "react";
import { router, Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const MainTabLayout = () => {
  const theme = useColorScheme(); // Returns 'light' or 'dark'
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme === "dark" ? "#000" : "#fff" }}
    >
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme === "dark" ? "#fff" : "#000",
          tabBarStyle: {
            backgroundColor: theme === "dark" ? "#000" : "#fff", // Tab bar background color
            borderColor: theme === "dark" ? "#000" : "#fff",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color }) => (
              <AntDesign name="search1" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="posts"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <AntDesign name="plus" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <AntDesign name="user" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default MainTabLayout;
