import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import "../global.css";

const HomePageStories = (props: any) => {
  const { item } = props;
  const handleOpenCamera = () => {
    router.push("/camera");
  };
  const handleOpenStory = () => {};
  return (
    <TouchableOpacity
      style={{
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
      onPress={item.role === "self" ? handleOpenCamera : handleOpenStory}
    >
      <Image
        className="rounded-full shadow-lg"
        source={{ uri: item?.image }}
        style={
          item.role === "self"
            ? { borderWidth: 1 }
            : item.role === "admin"
            ? { borderColor: "green", borderWidth: 2 }
            : { borderColor: "red", borderWidth: 2 }
        }
        width={60}
        height={60}
      />
      {item.role === "self" && (
        <AntDesign
          name="plus"
          size={10}
          color="white"
          style={{
            position: "absolute",
            padding: 5,
            bottom: 3,
            right: 3,
          }}
          className="bg-[#2E5077] rounded-full font-bold"
          onPress={handleOpenCamera}
        />
      )}
    </TouchableOpacity>
  );
};

export default HomePageStories;
