import React from 'react'
import NewsCardScroll from '../Components/NewsCard/NewsCardScroll'
import { db } from '../firebase/config'; // Adjust the path to your Firebase config accordingly
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';



function Tech() {
  async function testFetchFromFirestore() {
    try {
      const newsRef = collection(db, 'news');
      const q = query(newsRef, orderBy('timestamp', 'desc'), limit(15));
      const querySnapshot = await getDocs(q);
      const newsItems = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
      console.log("Fetched news items:", newsItems);
      if (newsItems.length === 0) {
        console.log("No news items found.");
      } else {
        console.log(`${newsItems.length} news items fetched successfully.`);
      }
    } catch (error) {
      console.error("Error fetching news from Firestore:", error);
    }
  }
  
  testFetchFromFirestore();
  


  return (
    <div>
      <NewsCardScroll/>
      
    </div>
  )
}

export default Tech


