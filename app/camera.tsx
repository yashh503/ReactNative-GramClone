import { MaterialIcons } from "@expo/vector-icons";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import {
  PanGestureHandler,
  GestureHandlerRootView,
  GestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const theme = useColorScheme(); // Returns 'light' or 'dark'

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <SafeAreaView className="flex-1 m-10">
        <Text className="text-3xl">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </SafeAreaView>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  const onGestureEvent = (event: GestureHandlerStateChangeEvent) => {
    const { translationX, state } = event.nativeEvent as any;

    // Check if the gesture has ended (State.END)
    if (state === State.END) {
      if (translationX < -100) {
        // Swiped left, navigate to camera
        router.push("/home"); // Use router.push to open the camera screen
      }
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: theme === "dark" ? "#000" : "#fff" }}
      >
        <PanGestureHandler
          onHandlerStateChange={onGestureEvent}
          activeOffsetX={[-10, 10]} // Detect significant horizontal swipes (left/right)
          failOffsetY={[-5, 5]} // Ignore vertical swipes
        >
          <CameraView className="flex-1" facing={facing}>
            <View>
              <TouchableOpacity onPress={toggleCameraFacing}>
                <MaterialIcons
                  name="flip-camera-android"
                  size={34}
                  color={theme === "dark" ? "white" : "black"}
                />
              </TouchableOpacity>
            </View>
          </CameraView>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
