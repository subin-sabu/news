import React, { createContext, useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

// Firebase app initialization
import { db } from '../firebase/config'

// Create Context
export const NewsContext = createContext();

// Provider Component
export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);


  const fetchNews = async () => {

    // Query to fetch the last 15 news items, ordered by their document ID (timestamp) in descending order
    const newsRef = collection(db, 'news');
    const q = query(newsRef, orderBy('timestamp', 'desc'), limit(13));

    const querySnapshot = await getDocs(q);
    const newsItems = [];
    querySnapshot.forEach((doc) => {
      newsItems.push({ id: doc.id, ...doc.data() });
    });
    setNews(newsItems);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchNews();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <NewsContext.Provider value={news}>
      {children}
    </NewsContext.Provider>
  );
};
