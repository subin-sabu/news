import React from 'react';
import './NewsScroll.css';
import newsArray from '../Assets/news'; 


function NewsScroll() {
  return (
    <div className='scroll-container'>
      <div className='scroll'>
        {newsArray.map((newsItem, index) => (
          <span key={index}>{newsItem.title}</span>
        ))}
       
      </div>
    </div>
  );
}

export default NewsScroll;
