import React, { useContext, useEffect, useState } from 'react';
import { NewsContext } from '../../Context/NewsContext';
import { db } from '../../firebase/config';
import { Grid, Paper, CardContent, Typography, Box, CardMedia } from '@mui/material';
import VideoContainer from '../iFrame Container/VideoContainer';
import HomeAd1 from '../../Advertisements/HomeAd1';
import { doc, getDoc } from 'firebase/firestore';

const NewsElaborate = ({ id }) => {
  const newsArray = useContext(NewsContext);
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attemptCount, setAttemptCount] = useState(0); // Keep track of attempt counts

  useEffect(() => {
    const item = newsArray.find(news => news.id === id);
    if (item) {
      setNewsItem(item);
      setLoading(false);
    } else {
      fetchNewsFromFirebase(id);
    }
  }, [id, newsArray]);

  const fetchNewsFromFirebase = async (newsId, attempts = 3) => {
    setLoading(true);
    let attempt = 0; // Local attempt counter

    while (attempt < attempts) {
      try {
        const docRef = doc(db, 'news', newsId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNewsItem({ id: docSnap.id, ...docSnap.data() });
          setLoading(false);
          return; // Exit the function if news is found
        } else {
          console.log("No such document!");
          attempt++; // Increment attempt counter if document not found
          setAttemptCount(attempt); // Update attempt count state
        }
      } catch (error) {
        console.error("Error getting document:", error);
        attempt++; // Increment attempt counter if an error occurs
        setAttemptCount(attempt); // Update attempt count state
      }

      if (attempt < attempts) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1000ms before next attempt
      }
    }

    // After all attempts
    if (attempt >= attempts) {
      setNewsItem(null);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!newsItem) {
    return <div style={{ fontSize: '20px' }}><br /><br />News not found 😞<br /><br /></div>;
  }

  

  //Calculating Date from timestamp
  function formatTimestamp(timestamp) {
    const { seconds } = timestamp;
    const date = new Date(seconds * 1000); // Convert timestamp to milliseconds
  
    // Array of month names to convert month number to month name
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    // Formatting the date components
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2); // Adding leading zero if necessary
    const secondsFormatted = ('0' + date.getSeconds()).slice(-2); // Adding leading zero if necessary
  
    // To show the time in UTC+5:30, calculate this offset manually
    // Note: This does not account for Daylight Saving Time changes
    const offsetHours = hours + 5;
    const offsetMinutes = minutes + 30;
  
    // Formatting the final string
    const formattedDate = `${day} ${monthName} ${year} at ${offsetHours}:${offsetMinutes}:${secondsFormatted} UTC+5:30`;
  
    return formattedDate;
  }
  
  return (
    <Box sx={{ marginTop: '.5rem' }}>
      <Paper sx={{ maxWidth: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'white', alignContent: 'center' }}>


        <CardContent sx={{ display: 'flex', flexDirection: 'column', textAlign: 'flex-start',justifyContent: 'space-around' }}>
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
          <Typography gutterBottom variant="caption" color='text.secondary' component="div" >
           
          {formatTimestamp(newsItem.timestamp)}
                   
          </Typography>
        </CardContent>
        <CardMedia sx={{ width: '100%', maxWidth: '100%' }}
                    component="img"
                    height="auto"
                    image={newsItem.imageUrl}
                    alt="news image"
                  />
        
        <CardContent sx={{ height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
        

          <Typography gutterBottom variant="body2" color="text.secondary" fontWeight={8} mb={1} mt={2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical' , fontWeight:'600'}}>
          {newsItem.heading1}         
          </Typography>

          <Typography variant="body2" color="text.secondary" fontWeight={8} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
          
            {newsItem.description1}
            
            
            </Typography>
          <VideoContainer videoURL={newsItem.videoUrl} />
          <Typography gutterBottom variant="body2" color="text.secondary" fontWeight={8} mb={1} mt={2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical' , fontWeight:'600'}}>
          {newsItem.heading2}         
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={8} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
            <br />
             {newsItem.description2}
          </Typography>

          <HomeAd1 />
          <Typography gutterBottom variant="body2" color="text.secondary" fontWeight={8} mb={1} mt={2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical' , fontWeight:'600'}}>
          {newsItem.heading3}         
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={8} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
            <br />
            {newsItem.description3}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary" fontWeight={8} mb={1} mt={2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical' , fontWeight:'600'}}>
          {newsItem.heading4}         
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={8} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
            <br />
            {newsItem.description4}
          </Typography>
        </CardContent>

      </Paper>




    </Box>
  )
}
export default NewsElaborate;