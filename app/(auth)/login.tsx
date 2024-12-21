import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const navigateToSignup = () => {
    router.push("/register");
  };
  const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8).max(30),
  });
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });
  const handleLogin = (data: any) => {
    console.log(data);
    router.push("/home");
  };
  return (
    // <KeyboardAvoidingView behavior="padding">
    <View className="flex-1 bg-[#2E5077] ">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="px-2 flex-1"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View className="flex-1 justify-center items-center px-8">
            <Text className="text-gray-900 dark:text-white text-3xl m-5">
              {" "}
              Login
            </Text>
            <View className="flex-col w-full gap-5">
              <View>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      className="border p-5 dark:border-white w-full rounded-lg dark:bg-white"
                      placeholder="Email"
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.email && (
                  <Text className="text-red-500">{errors.email.message}</Text>
                )}
              </View>
              <View>
                <View className="relative">
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        className="border p-5 dark:border-white w-full rounded-lg dark:bg-white"
                        placeholder="Password"
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={!isPasswordVisible}
                      />
                    )}
                  />
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    className="absolute right-5 top-4"
                  >
                    <AntDesign
                      name={isPasswordVisible ? "eye" : "eyeo"} // eye when visible, eyeo when hidden
                      size={24}
                      color="#888"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text className="text-red-500">
                    {errors.password.message}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                className={`text-center p-5 w-full rounded-lg ${
                  isValid ? "bg-blue-600" : "bg-blue-200"
                }`}
                onPress={handleSubmit(handleLogin)}
                disabled={!isValid}
              >
                <Text className="text-center text-white">Login</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text className="text-gray-600 text-center dark:text-gray-300 mt-10">
                Don't have an account?{" "}
                <Text
                  className="text-center text-blue-600 py-2 underline underline-offset-4 font-bold"
                  onPress={navigateToSignup}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default login;
