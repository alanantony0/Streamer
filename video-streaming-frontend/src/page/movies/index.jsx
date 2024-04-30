import React, { useState, useEffect } from "react";
import { Carousel, Card } from "antd";
import { fetchVideos } from "../../helpers.js/helperFunctions";
import { config } from "../../helpers.js/config";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";

const MoviesSection = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleCardClick = (video) => {
    setSelectedVideo(video);
  };

  useEffect(() => {
    // setVideos(fetchVideos());
    const fetchData = async () => {
      try {
        const data = await fetchVideos();
        setShowPaymentPopup(data?.isSubscribed);
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchData();
  }, []);

  console.log(videos, "video", selectedVideo);
  return (
    <div>
      <div className="carousel-container">
        <Carousel autoplay>
          {videos?.map((video) => (
            <div key={video.id}>
              <div className="card-container">
                <Card
                  hoverable
                  cover={
                    <img
                      className="card-image"
                      alt={video?.originalname}
                      src={video?.thumbNail}
                    />
                  }
                  onClick={() => handleCardClick(video)}
                >
                  <Card.Meta className="card-title" title={video.title} />
                </Card>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      {selectedVideo && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "70%" }}>
            <h1>{selectedVideo?.title}</h1>
            <video controls style={{ width: "100%" }}>
              <source
                src={`${config?.CLOUDFRONT_URL}/${selectedVideo?.originalname}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesSection;
