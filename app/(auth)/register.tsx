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
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
}

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Define the schema for the form input using Zod
  const registerSchema: z.ZodSchema<IFormInput> = z.object({
    username: z
      .string()
      .max(20, "Username cannot exceed 20 characters")
      .refine((data) => data !== "", {
        message: "Username is required.",
      }),
    email: z
      .string()
      .email("Please enter a valid email address")
      .refine((data) => data !== "", {
        message: "Email is required.",
      }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password cannot exceed 30 characters")
      .refine((data) => data !== "", {
        message: "Password is required.",
      }),
    confirmpassword: z
      .string()
      .refine((data) => data === getValues("password"), {
        message: "Passwords do not match",
      }),
  });

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });

  const navigateToSignup = () => {
    router.push("/login");
  };

  const onSubmit = (data: any) => {
    const { username, email, password, confirmpassword } = data;
    console.log(data);
    if (!username && !email && !password && !confirmpassword) {
      alert("All fields are required.");
      return;
    }

    if (password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    router.push("/login");
  };

  return (
    <View className="flex-1  bg-[#2E5077]">
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
              Register
            </Text>
            <View className="flex-col w-full gap-5">
              {/* Username Input */}
              <View>
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      className="border p-5 dark:border-white w-full rounded-lg dark:bg-white"
                      placeholder="Username"
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.username && (
                  <Text className="text-red-500">
                    {errors.username.message}
                  </Text>
                )}
              </View>
              <View>
                {/* Email Input */}
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
                {/* Password Input */}
                <View className="relative">
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        className="border p-5 dark:border-white w-full rounded-lg dark:bg-white"
                        placeholder="Password"
                        secureTextEntry={!isPasswordVisible}
                        onChangeText={onChange}
                        value={value}
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
              <View>
                {/* Confirm Password Input */}
                <View className="relative">
                  <Controller
                    control={control}
                    name="confirmpassword"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        className="border p-5 dark:border-white w-full rounded-lg dark:bg-white"
                        placeholder="Confirm Password"
                        secureTextEntry={!isPasswordVisible}
                        onChangeText={onChange}
                        value={value}
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
                {errors.confirmpassword && (
                  <Text className="text-red-500">
                    {errors.confirmpassword.message}
                  </Text>
                )}
              </View>
              {/* Submit Button */}
              <TouchableOpacity
                className={`text-center p-5 w-full rounded-lg ${
                  isValid ? "bg-blue-600" : "bg-blue-200"
                }`}
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid}
              >
                <Text className="text-center text-white">Register</Text>
              </TouchableOpacity>
            </View>

            {/* Login Link */}
            <View>
              <Text className="text-gray-600 text-center dark:text-gray-300 mt-10">
                Already have an account?{" "}
                <Text
                  className="text-center text-blue-600 py-2 underline underline-offset-4 font-bold"
                  onPress={navigateToSignup}
                >
                  Sign in
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;
