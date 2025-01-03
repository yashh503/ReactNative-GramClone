import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthLayout = () => {
  // const checkLoginStatus = async () => {
  //   const token = await AsyncStorage.getItem("authToken");
  //   console.log(token, "here");
  //   if (token) {
  //     router.push("/home");
  //   }
  // };
  // useEffect(() => {
  //   checkLoginStatus();
  // }, []);
  return (
    <View className="flex-1">
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

export default AuthLayout;
