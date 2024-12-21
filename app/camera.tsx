import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
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
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
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
    <View style={styles.container}>
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: theme === "dark" ? "#000" : "#fff" }}
      >
        <PanGestureHandler
          onHandlerStateChange={onGestureEvent}
          activeOffsetX={[-10, 10]} // Detect significant horizontal swipes (left/right)
          failOffsetY={[-5, 5]} // Ignore vertical swipes
        >
          <CameraView style={styles.camera} facing={facing}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraFacing}
              >
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
