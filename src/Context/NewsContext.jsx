import React, { createContext, useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

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

        // If no news items were fetched, try fetching again
        if (newsItems.length === 0 && attempt < 3) { // Limit the number of attempts to avoid infinite loops
          console.log(`Attempt ${attempt + 1}: No news found, retrying...`);
          setAttempt(attempt + 1);
        } else if (attempt >= 3) {
          // After several attempts, consider more drastic measures or logging
          console.error("Failed to fetch news after multiple attempts.");
          // Consider showing an error message or providing a manual refresh option to the user here
        }

      } catch (error) {
        console.error("An error occurred while fetching news:", error);
        // Handle error (e.g., by showing a message to the user)
      }
    };

    fetchNews();
  }, [attempt]); // Rerun effect when `attempt` changes, up to the limit set

  return (
    <NewsContext.Provider value={news}>
      {children}
    </NewsContext.Provider>
  );
};
