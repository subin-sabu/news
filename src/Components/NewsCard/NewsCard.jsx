import  React , { useContext } from 'react';
import { NewsContext } from '../../Context/NewsContext'; // Adjust the import path if used in other components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@emotion/react';
import {Link} from 'react-router-dom'
import styles from './NewsCard.module.css'


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


export default function NewsCard({ startIndex, endIndex, className, imageType }) {
  const theme = useTheme();
  const newsArray = useContext(NewsContext); // Use context to get the news array

  return (
    <Box className={className} >
      <Grid container
        rowSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        justifyContent='center'
        >
        {newsArray.slice(startIndex, endIndex).map((news, index) => {
          // Decide the image URL based on the `imageType` prop for each news item
          const imageUrl = news[imageType === 'image' ? 'imageUrl' : 'thumbnailUrl'];

          return (
            <Grid item key={index} spacing={1}>
              <Link to={`/News/${news.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card sx={{ maxWidth: 500,
                  [theme.breakpoints.up('sm')]: {maxWidth: 260},
                  height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={imageUrl}
                      alt="news image"
                    />
                    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Typography gutterBottom variant="caption" color='text.secondary' component="div">
                        {formatTimestamp(news.timestamp)}
                      </Typography>
                      
                      <Typography className={styles['title-line-clamp']} gutterBottom variant="body2" component="div" sx={{ mb: 1, fontWeight: '600',}}>
                        {news.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

