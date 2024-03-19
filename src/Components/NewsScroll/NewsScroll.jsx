import React , { useContext }from 'react';
import './NewsScroll.css';
import { NewsContext } from '../../Context/NewsContext';



function NewsScroll() {
   
  const newsArray = useContext(NewsContext);

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
