import React, { useState, useContext } from 'react';
import './NewsCardVertical.css';
import { Link } from 'react-router-dom'
import { NewsContext } from '../../Context/NewsContext';



function NewsCardVertical({ startIndex, endIndex }) {
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

  return (

    <div className='news-container'>
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
                <img src={news.imageUrl} alt="news" />
              </div>
              <div className='news-content'>
                <p>{news.time}</p>
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
