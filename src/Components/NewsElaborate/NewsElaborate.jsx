import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid, Paper } from '@mui/material';
import {Box } from '@mui/system';
import mainNews from '../Assets/main';



export default function NewsElaborate() {
  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Grid container
        rowSpacing={{ xs: 1 }}
        columnSpacing={{ xs: 1 }}
        justifyContent='center'>

        {mainNews.map((news, index) => (
          <Grid item key={index} xs={12}    >
            <Paper sx={{ maxWidth: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'white', alignContent: 'center' }}>


              <CardContent sx={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
                <Typography gutterBottom variant="h5" fontWeight='500' component="div" sx={{ mb: 1 }}>
                  {news.title}
                </Typography>
              </CardContent>
              <CardMedia sx={{ width: '100%', maxWidth: '100%' }}
                component="img"
                height="auto"
                image={news.imageURL}
                alt="news image"
              />
              <CardContent sx={{ height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                <Typography gutterBottom variant="caption" color='text.secondary' component="div" >
                  {news.time}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                  {news.description}
                </Typography>
              </CardContent>

            </Paper>
          </Grid>
        ))}

      </Grid>
    </Box>

  );
}
