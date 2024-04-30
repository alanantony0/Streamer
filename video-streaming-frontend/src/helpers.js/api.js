// api.js
import axios from 'axios';

const uploadVideo = async (uploadEndpoint, videoFile, imageFile, title) => {
  try {
    if (videoFile) {
      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("thumbnail", imageFile);
      formData.append("title", title);

      const response = await axios.post(
        uploadEndpoint,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    }
  } catch (error) {
    throw new Error("Error uploading video:", error);
  }
};

export default uploadVideo;
