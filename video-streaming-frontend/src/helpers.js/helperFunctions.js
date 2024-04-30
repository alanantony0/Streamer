import axios from "axios";

export const fetchVideos = async () => {
  try {
    const response = await axios.get("http://localhost:8000/videos");
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
};
