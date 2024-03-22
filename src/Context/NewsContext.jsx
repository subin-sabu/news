import React, { createContext, useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

// Firebase app initialization
// Assume you've already initialized Firebase elsewhere in your app
import {db} from '../firebase/config'

// Create Context
export const NewsContext = createContext();

// Provider Component
export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
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

    fetchNews();
  }, []);

  return (
    <NewsContext.Provider value={news}>
      {children}
    </NewsContext.Provider>
  );
};
