import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import "../global.css";
import { useFonts } from "expo-font";
import CustomSplashScreen from "@/components/CustomSplashScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
  const theme = useColorScheme(); // Returns 'light' or 'dark'

  const [fontsLoaded] = useFonts({
    Montserrat: require("../assets/fonts/Montserrat-Medium.ttf"),
    BoldMontserrat: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  const [isSplashReady, setIsSplashReady] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Set to null initially
  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);
  useEffect(() => {
    async function prepare() {
      // Hide the splash screen when fonts are loaded
      if (fontsLoaded) {
        setTimeout(async () => {
          setIsSplashReady(false);
        }, 2000);
      }
    }
    prepare();
  }, [fontsLoaded]);

  // Show a blank screen until the fonts are loaded or the auth check is in progress
  // if (isSplashReady) {
  //   return <CustomSplashScreen />;
  // }

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: theme === "dark" ? "#000" : "#fff",
      }}
    >
      <SafeAreaProvider
        style={{
          flex: 1,
          backgroundColor: theme === "dark" ? "#000" : "#fff",
        }}
      >
        <StatusBar
          style={theme === "dark" ? "light" : "dark"}
          translucent={true}
        />
        <Stack>
          {/* {isAuthenticated ? (
            <> */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />

          <Stack.Screen
            name="camera"
            options={{ headerShown: false, animation: "ios_from_left" }}
          />
          <Stack.Screen
            name="likes"
            options={{
              headerShown: true,
              title: "Notifications",
              headerStyle: {
                backgroundColor: theme === "dark" ? "#000" : "#fff",
              },
              headerTintColor: theme === "dark" ? "#fff" : "#000",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="message"
            options={{
              headerShown: true,
              title: "jack__12312",
              headerStyle: {
                backgroundColor: theme === "dark" ? "#000" : "#fff",
              },
              headerTintColor: theme === "dark" ? "#fff" : "#000",
              animation: "ios_from_right",
            }}
          />
          {/* </>
          ) : (
            <> */}
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          {/* </>
          )} */}
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
