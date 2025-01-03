import { MaterialIcons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useState } from "react";
import {
  Button,
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
  TapGestureHandler,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
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
        // Swiped left, navigate to the next screen (e.g., /home)
        router.push("/home");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PanGestureHandler
          onHandlerStateChange={onGestureEvent}
          activeOffsetX={[-10, 10]}
          failOffsetY={[-5, 5]}
        >
          <View style={{ flex: 1 }}>
            <TapGestureHandler
              numberOfTaps={2}
              onActivated={toggleCameraFacing}
            >
              <CameraView style={styles.camera} facing={facing}>
                <View style={styles.cameraControls}>
                  <TouchableOpacity onPress={toggleCameraFacing}>
                    <MaterialIcons
                      name="flip-camera-android"
                      size={34}
                      color={theme === "dark" ? "white" : "black"}
                    />
                  </TouchableOpacity>
                </View>
              </CameraView>
            </TapGestureHandler>
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
});
