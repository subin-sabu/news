import  React , { useContext } from 'react';
import { NewsContext } from '../../Context/NewsContext'; // Adjust the import path to where your NewsContext is defined
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@emotion/react';

export default function NewsCard({ startIndex, endIndex }) {
  const theme = useTheme();
  const newsArray = useContext(NewsContext); // Use context to get the news array

  return (
    <Box>
      <Grid container
        rowSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        justifyContent='center'
        >
        {newsArray.slice(startIndex, endIndex).map((news, index) => (
          <Grid item key={index} spacing={1}>
            <Card sx={{ maxWidth: 500,
              [theme.breakpoints.up('sm')]: {maxWidth: 260},
              height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={news.imageUrl}
                  alt="news image"
                />
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography gutterBottom variant="caption" color='text.secondary' component="div">
                    {news.time}
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div" sx={{ mb: 1, fontWeight: '600'}}>
                    {news.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
