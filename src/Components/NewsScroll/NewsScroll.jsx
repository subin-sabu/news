import React , { useContext }from 'react';
import styles from './NewsScroll.module.css';
import { NewsContext } from '../../Context/NewsContext';



function NewsScroll() {
   
  const newsArray = useContext(NewsContext);

  return (
    <div className={styles['scroll-container']}>
      <div className={styles.scroll}>
        {newsArray.map((newsItem, index) => (
          <span key={index}>{newsItem.title}</span>
        ))}
       
      </div>
    </div>
  );
}

export default NewsScroll;
