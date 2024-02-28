import React from "react";


const VideoContainer = ({ videoURL }) => {
  // Function to convert a YouTube URL to its embed URL format
  const convertToEmbedURL = (url) => {
    // Define a regular expression to extract the video ID from various YouTube URL formats
    // This regex handles standard YouTube links, shortened youtu.be links, and embed links
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
    const match = url.match(regExp);

    // If a match is found and the second group (video ID) is exactly 11 characters long (the length of YouTube video IDs), use it
    const videoID = match && match[2].length === 11 ? match[2] : null;
    
    // If a video ID was successfully extracted, construct the embed URL
    if (videoID) {
      return `https://www.youtube.com/embed/${videoID}?rel=0`; // The "?rel=0" parameter limits related content shown after the video plays
    }

    // If no recognizable YouTube URL format is detected, return the original URL
    return url;
  };

  // Convert the input video URL to the embed URL format
  const embedURL = convertToEmbedURL(videoURL);



  return (
    <div style={{
      position: 'relative',
      paddingBottom: '56.25%', // For a 16:9 aspect ratio
      height: 0,
      overflow: 'hidden'
    }}>
      <iframe
        src={embedURL}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: '0' // Removes the border
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded video"
      />
    </div>
  );
};

export default VideoContainer
