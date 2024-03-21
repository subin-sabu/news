import React, { useState, useContext } from 'react';
import './NewsCardVertical.css';
import { Link } from 'react-router-dom'
import { NewsContext } from '../../Context/NewsContext';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Typography } from '@mui/material';



function NewsCardVertical({ startIndex, endIndex, heading }) {
  const newsArray = useContext(NewsContext);

  const [ripples, setRipples] = useState({});

  const addRipple = (index, event) => {
    const button = event.currentTarget.getBoundingClientRect();
    const size = Math.max(button.width, button.height);
    const x = event.clientX - button.left - size / 2;
    const y = event.clientY - button.top - size / 2;
    const newRipple = { x, y, size };

    // Update the ripples state with the new ripple
    setRipples({ ...ripples, [index]: newRipple });
  };

  const removeRipple = (index) => {
    setRipples(currentRipples => {
      const newRipples = { ...currentRipples };
      delete newRipples[index];
      return newRipples;
    });
  };

  //Calculating time for news cards
function formatTimestamp(timestamp) {
  const { seconds } = timestamp;
  const newsDate = new Date(seconds * 1000); // Convert Firestore timestamp to JavaScript Date
  const now = new Date();
  const differenceInSeconds = (now - newsDate) / 1000;
  const differenceInMinutes = differenceInSeconds / 60;
  const differenceInHours = differenceInMinutes / 60;
  const differenceInDays = differenceInHours / 24;

  if (differenceInSeconds < 60) {
    return 'Just now';
  } else if (differenceInMinutes < 60) {
    return `${Math.floor(differenceInMinutes)} minute${Math.floor(differenceInMinutes) === 1 ? '' : 's'} ago`;
  } else if (differenceInHours < 2) {
    return `1 hour ago`;
  } else if (differenceInHours < 24) {
    return `${Math.floor(differenceInHours)} hour${Math.floor(differenceInHours) === 1 ? '' : 's'} ago`;
  } else if (differenceInDays < 2) {
    return `1 day ago`;
  } else {
    return `${Math.floor(differenceInDays)} day${Math.floor(differenceInDays) === 1 ? '' : 's'} ago`;
  }
}


  return (

    <div className='news-container'>
      <Typography gutterBottom fontSize={20} fontWeight={600} color='primary.sub' style={{ display: 'flex', justifyContent: 'flex-start', gap: '.7rem', alignSelf:'flex-start'}}><ArrowCircleRightIcon />{heading}</Typography>
      {newsArray.slice(startIndex, endIndex).map((news, index) => (
        <div key={index} className='card'>
        <Link to={`/News/${news.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

              <div className='news-card-content'
              onMouseDown={(event) => addRipple(index, event)}
              onMouseUp={() => removeRipple(index)}>
              {/* Ripple Element */}
              {ripples[index] && (
                <span
                  className="ripple"
                  style={{
                    left: `${ripples[index].x}px`,
                    top: `${ripples[index].y}px`,
                    width: `${ripples[index].size}px`,
                    height: `${ripples[index].size}px`,
                    position: 'absolute',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    transform: 'scale(0)',
                    animation: 'ripple 0.6s linear',
                  }}
                />
              )}
              <div className='img-div'>
                <img src={news.thumbnailUrl} alt="news" />
              </div>
              <div className='news-content'>
                <p >{formatTimestamp(news.timestamp)}</p>
                <h5>{news.title}</h5>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>

  );
}

export default NewsCardVertical;
