import { Link, Redirect, router } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
// import CustomButton from "@/components/CustomButton";
// import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  // const { loading, isLogged } = useGlobalContext();

  // if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <View className=" bg-[#2E5077] flex-1">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={require("../assets/images/logo.png")}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">"Stalk Hear"</Text>
            </Text>

            {/* <Image
              source={require("../assets/images/logo.png")}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            /> */}
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora...
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/home")}
            className="w-full mt-7 text-center p-5 rounded-lg bg-[#4DA1A9]"
          >
            <Text className="text-center text-yellow-50 text-xl">
              Continue with Email
            </Text>
          </TouchableOpacity>
          {/* <Link href="/home" className="text-sm font-pregular text-gray-100 mt-7 text-center">Skip</Link> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Welcome;
