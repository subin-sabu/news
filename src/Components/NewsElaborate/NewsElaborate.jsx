import React, { useContext, useEffect, useState } from 'react';
import { NewsContext } from '../../Context/NewsContext';
import { db } from '../../firebase/config';
import { Grid, Paper, CardContent, Typography, Box, } from '@mui/material';
import VideoContainer from '../iFrame Container/VideoContainer';
import HomeAd1 from '../../Advertisements/HomeAd1';
import { doc, getDoc } from 'firebase/firestore';



const NewsElaborate = ({id}) => {
  
 
  const newsArray = useContext(NewsContext);
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the news item exists in the context
    const item = newsArray.find(news => news.id === id);
    if (item) {
      setNewsItem(item);
      setLoading(false);
    } else {
      // Fetch from Firebase
      fetchNewsFromFirebase(id);
    }
  }, [id, newsArray]);

  const fetchNewsFromFirebase = async (newsId) => {
    setLoading(true); // Show loading state
  
    try {
      const docRef = doc(db, 'news', newsId); // Get a reference to the document
      const docSnap = await getDoc(docRef); // Attempt to fetch the document
  
      if (docSnap.exists()) {
        setNewsItem({ id: docSnap.id, ...docSnap.data() }); // If the document exists, update the state
      } else {
        console.log("No such document!");
        setNewsItem(null); // If no document is found, set newsItem to null
      }
    } catch (error) {
      console.error("Error getting document:", error); // Log any errors
      setNewsItem(null); // Ensure newsItem is set to null on error
    }
  
    setLoading(false); // Hide loading state
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!newsItem) {
    return <div style={{fontSize:'20px'}}><br /><br />News not found 😞<br /><br /></div>;
  }

  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Paper sx={{ maxWidth: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'white', alignContent: 'center' }}>


        <CardContent sx={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
          <Typography gutterBottom fontWeight='600' component="div" sx={{

            fontSize: '1.5rem', // default 
            '@media (min-width:0px)': {

              fontSize: '0.875rem', // for mobile
            },
            '@media (min-width:600px)': {

              fontSize: '1.5rem', // for bigger screens
            },
          }}>
            {newsItem.title}
          </Typography>
        </CardContent>
        <VideoContainer videoURL={newsItem.videoUrl} />

        <CardContent sx={{ height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <Typography gutterBottom variant="caption" color='text.secondary' component="div" >
            {newsItem.time}
          </Typography>

          <Typography variant="body2" color="text.secondary" fontWeight={8} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
            {newsItem.description1}
            <br />
            <br />
            {newsItem.description2}
          </Typography>
          <HomeAd1 />
          <Typography variant="body2" color="text.secondary" fontWeight={8} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
            <br />
            {newsItem.description3}
          </Typography>
        </CardContent>

      </Paper>




    </Box>
  )
}
export default NewsElaborate;