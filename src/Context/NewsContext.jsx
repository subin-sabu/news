import React, { createContext, useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

// Create Context
export const NewsContext = createContext();

// Provider Component
export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [attempt, setAttempt] = useState(0); // Add state to track fetch attempts

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Query to fetch the last 15 news items, ordered by their timestamp in descending order
        const newsRef = collection(db, 'news');
        const q = query(newsRef, orderBy('timestamp', 'desc'), limit(15));
      
        const querySnapshot = await getDocs(q);
        const newsItems = [];
        querySnapshot.forEach((doc) => {
          newsItems.push({ id: doc.id, ...doc.data() });
        });

        setNews(newsItems);
        console.log(newsItems);
        
        if (newsItems.length === 0 && attempt < 3) { // Limit the number of attempts to avoid infinite loops
          setTimeout(() => {
            console.log(`Attempt ${attempt + 1}: No news found, retrying...`);
            setAttempt(attempt + 1);
          }, 1000); // Wait for 1000ms before retrying
        } else if (attempt >= 3) {
          console.error("Failed to fetch news after multiple attempts.");
        }

      } catch (error) {
        console.error("An error occurred while fetching news:", error);
      }
    };

    fetchNews();

    // Cleanup function to clear the timeout
    return () => {
      if (attempt < 3) {
        clearTimeout();
      }
    };
  }, [attempt]); // Rerun effect when `attempt` changes, up to the limit set

  return (
    <NewsContext.Provider value={news}>
      {children}
    </NewsContext.Provider>
  );
};