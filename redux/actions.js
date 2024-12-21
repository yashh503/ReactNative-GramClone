import axios from "axios";

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
