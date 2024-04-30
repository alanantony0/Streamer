// VideoUploadPage.js
import React, { useState } from "react";
import { Card, Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { config } from "../../helpers.js/config";
import uploadVideo from "../../helpers.js/api";
import "./index.css";

const VideoUploadPage = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbNailFile, setThumbNailFile] = useState(null);

  // console.log("hi", videoFile, thumbNailFile);
  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log("hi");
    try {
      if (videoFile) {
        const uploadEndpoint = `${config.BACKEND_URL}videos/upload`;
        const response = await uploadVideo(
          uploadEndpoint,
          videoFile,
          thumbNailFile
        );
        console.log("Video uploaded successfully:", response);
        setVideoFile(null);
        setThumbNailFile(null);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handleVideoChange = (info) => {
    console.log(info.file);
    setVideoFile(info.file);
  };

  const handleThumbnailChange = (info) => {
    console.log(info.file);
    setThumbNailFile(info.file);
  };

  return (
    <div className="Upladcontainer">
      <div className="center">
        <Card title="Upload Video" style={{ width: 400 }}>
          <Form onFinish={handleSubmit}>
            <Form.Item label="Choose Video File:">
              <Upload
                accept="video/*"
                beforeUpload={() => false}
                onChange={handleVideoChange}
              >
                <Button icon={<UploadOutlined />}>Select Video File</Button>
              </Upload>
            </Form.Item>
            <Form.Item label="Upload Thumbnail:">
              <Upload
                accept="image/*"
                beforeUpload={() => false}
                onChange={handleThumbnailChange}
              >
                <Button icon={<UploadOutlined />}>Select Thumbnail</Button>
              </Upload>
            </Form.Item>{" "}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Upload
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default VideoUploadPage;
