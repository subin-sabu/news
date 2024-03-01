import React from 'react';
import './NewsScroll.css';
import newsArray from '../Assets/news'; // Adjust the path as necessary

function NewsScroll() {
  return (
    <div className='scroll-container'>
      <div className='scroll'>
        {newsArray.map((newsItem, index) => (
          <span key={index}>{newsItem.title}</span>
        ))}
        {/* To simulate an infinite loop, you might consider duplicating the content,
            but for a more dynamic and real infinite scroll, consider a different approach */}
      </div>
    </div>
  );
}

export default NewsScroll;
