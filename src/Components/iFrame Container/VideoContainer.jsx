import React from "react";

const VideoContainer = ({ videoURL }) => {
  // Early check to ensure a URL is provided
  if (!videoURL) {
    return null;
  }
  
  // Function to determine the type of video link and convert it if necessary
  const processVideoURL = (url) => {
    // YouTube URL in standard format
    if (url.match(/watch\?v=([a-zA-Z0-9_-]+)/)) {
      const id = url.split('v=')[1].split('&')[0]; // Extract the video ID
      return `https://www.youtube.com/embed/${id}`;
    }
    // YouTube URL in shortened format
    else if (url.match(/youtu.be\/([a-zA-Z0-9_-]+)/)) {
      const id = url.split('youtu.be/')[1].split('?')[0]; // Extract the video ID
      return `https://www.youtube.com/embed/${id}`;
    }
    // Direct video link (assumes valid video URL from Firebase or similar)
    else if (url.match(/\.(mp4|webm)$/)) {
      return url;
    }
    // Not a valid video link
    return null;
  };

  const processedURL = processVideoURL(videoURL);

  if (!processedURL) {
    return null;
  }

  const isYoutubeLink = processedURL.includes("youtube.com/embed/");

  return (
    <div style={{ position: 'relative', paddingBottom: isYoutubeLink ? '56.25%' : '0', height: 0, overflow: 'hidden' }}>
      {isYoutubeLink ? (
        <iframe
          src={processedURL}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: '0'
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded video"
        />
      ) : (
        <video
          controls
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          src={processedURL}
          title="Video content"
        />
      )}
    </div>
  );
};

export default VideoContainer;
