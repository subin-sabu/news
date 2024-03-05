import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { Box } from '@mui/system';
import newsArray from '../Assets/news';
import { useTheme } from '@emotion/react';






export default function NewsCard() {
  const theme = useTheme();
  return (
    <Box sx={{ marginTop: '2rem', marginBottom:'2rem'}}>
      <Grid container
        rowSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        justifyContent='center'>

        {newsArray.map((news, index) => (
          <Grid item key={index} spacing={1} >
            <Card sx={{  maxWidth: 360,
              [theme.breakpoints.up('sm')]:{maxWidth: 260},
              height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' , }}>
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
                  <Typography gutterBottom variant="body2" component="div" sx={{ mb: 1, fontWeight:'600'}}>
                    {news.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}>
                    {news.description1}
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
