import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const URL = "http://192.168.0.25:6969";
const jsonConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const checkLoginStatus = async () => {
  const token = await AsyncStorage.getItem("authToken");
  console.log(token);
  if (token) {
    return true;
  } else {
    return false;
  }
};

export const fetchData = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/users");
    // console.log(response)
    return response.data.users; // Return just the data part of the response
  } catch (e) {
    console.error("Error fetching data:", e);
    throw e; // Optionally rethrow the error
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axios.post(`${URL}/api/v1/auth/login`, payload);
    return response;
  } catch (e) {
    console.error("Error fetching data:", e);
    throw e; // Optionally rethrow the error
  }
};
