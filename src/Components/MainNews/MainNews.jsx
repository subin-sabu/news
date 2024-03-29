import React, {useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import HomeAd16x9 from '../../Advertisements/HomeAd16x9';
import NewsCard from '../NewsCard/NewsCard';
import { NewsContext } from '../../Context/NewsContext'; // Adjust the import path if used in other components



export default function MainNews({ className }) {

   //Calculating time for news cards
function formatTimestamp(timestamp) {
  const { seconds } = timestamp;
  const newsDate = new Date(seconds * 1000); // Convert Firestore timestamp to JavaScript Date
  const now = new Date();
  const differenceInSeconds = (now - newsDate) / 1000;
  const differenceInMinutes = differenceInSeconds / 60;
  const differenceInHours = differenceInMinutes / 60;
  const differenceInDays = differenceInHours / 24;

  if (differenceInSeconds < 60) {
    return 'Just now';
  } else if (differenceInMinutes < 60) {
    return `${Math.floor(differenceInMinutes)} minute${Math.floor(differenceInMinutes) === 1 ? '' : 's'} ago`;
  } else if (differenceInHours < 2) {
    return `1 hour ago`;
  } else if (differenceInHours < 24) {
    return `${Math.floor(differenceInHours)} hour${Math.floor(differenceInHours) === 1 ? '' : 's'} ago`;
  } else if (differenceInDays < 2) {
    return `1 day ago`;
  } else {
    return `${Math.floor(differenceInDays)} day${Math.floor(differenceInDays) === 1 ? '' : 's'} ago`;
  }
}

  const newsArray = useContext(NewsContext); // Use context to get the news array
  return (
    <Box className={className} sx={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', justifyContent: 'space-around', 
      }}>
      <Grid container
        rowSpacing={{ xs: 1 }}
        columnSpacing={{ xs: 1 }}
        justifyContent='center'
        sx={{display: { xs: 'none', sm: 'block' }}}
        >

        {newsArray.slice(0, 1).map((news, index) => (
          <Grid item key={index} xs={12}    >
            <Link to={`/News/${news.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card sx={{ minWidth: 200, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                  <CardContent sx={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
                    <Typography variant="body2" fontWeight='600' component="div" fontSize={17} >
                      {news.title}
                    </Typography>
                  </CardContent>
                  <CardMedia sx={{ width: '100%', maxWidth: '100%' }}
                    component="img"
                    height="auto"
                    image={news.imageUrl}
                    alt="news image"
                  />
                  <CardContent sx={{ height: '80%', display: 'flex', flexDirection: 'column' }}>
                    <Typography gutterBottom variant="caption" color='text.secondary' component="div" >
                      {formatTimestamp(news.timestamp)}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', }}>
                      {news.description1}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}

      </Grid>

      {/* Optional Sections based on different viewports */}

      {/* <Box sx={{ width: '100%', display: { xs: 'block', sm: 'none' } }}>
      <Link to='/News' style={{ textDecoration: 'none', color: 'inherit' }}>
        <NewsCard startIndex={0} endIndex={1}/>
      </Link>
      </Box> */}

      <Box sx={{ width: '100%', display: { xs: 'none', sm: 'block' } }}>
        <HomeAd16x9 />
      </Box>
    </Box>

  );
}
