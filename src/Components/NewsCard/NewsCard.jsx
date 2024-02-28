import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { Box } from '@mui/system';
import newsArray from '../Assets/news';







export default function NewsCard() {
  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Grid container
        rowSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        justifyContent='center'>

        {newsArray.map((news, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}   >
            <Card sx={{  maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'  }}>
              <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={news.imageURL}
                  alt="news image"
                />
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography gutterBottom variant="caption" color='text.secondary' component="div">
                    {news.time}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div" sx={{ mb: 1 }}>
                    {news.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}>
                    {news.description}
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
