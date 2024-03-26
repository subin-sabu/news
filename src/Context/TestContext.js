import React, { createContext, useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

// Create Context
export const TestContext = createContext();

// Provider Component
export const TestProvider = ({ children }) => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Start listening to the collection with onSnapshot
    const unsubscribe = onSnapshot(
      collection(db, "test"),
      (querySnapshot) => {
        const updatedTests = querySnapshot.docs.map(doc => ({
          id: doc.id, 
          ...doc.data(),
        }));
        setTests(updatedTests); // Update state with the new data
        setLoading(false); // Data has been fetched, set loading to false
      },
      (error) => {
        console.error("Error listening to tests changes:", error);
        setLoading(false); // In case of error, ensure loading is set to false
      }
    );

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();

  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <TestContext.Provider value={{ tests, loading }}>
      {children}
    </TestContext.Provider>
  );
};
