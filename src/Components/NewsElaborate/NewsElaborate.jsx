import  React, {useContext} from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, Paper } from '@mui/material';
import {Box } from '@mui/system';
import VideoContainer from '../iFrame Container/VideoContainer';
import HomeAd1 from '../../Advertisements/HomeAd1';
import { NewsContext } from '../../Context/NewsContext';



export default function NewsElaborate() {
  const newsArray = useContext(NewsContext);
  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Grid container
        rowSpacing={{ xs: 1 }}
        columnSpacing={{ xs: 1 }}
        justifyContent='center'>

        {newsArray.slice(0,1).map((news, index) => (
          <Grid item key={index} xs={12}    >
            <Paper sx={{ maxWidth: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'white', alignContent: 'center' }}>


              <CardContent sx={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
                <Typography gutterBottom fontWeight='600' component="div"  sx={{
      
        fontSize: '1.5rem', // default 
        '@media (min-width:0px)': {
     
          fontSize: '0.875rem', // for mobile
        },
        '@media (min-width:600px)': {
          
          fontSize: '1.5rem', // for bigger screens
        },
      }}>
                  {news.title}
                </Typography>
              </CardContent>
              <VideoContainer videoURL={news.videoUrl}/>

              <CardContent sx={{ height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                <Typography gutterBottom variant="caption" color='text.secondary' component="div" >
                  {news.time}
                </Typography>

                <Typography variant="body2" color="text.secondary" fontWeight={8} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                  {news.description1}
                  <br />
                  <br/>
                  {news.description2}
                </Typography>
                <HomeAd1/>
                <Typography variant="body2" color="text.secondary" fontWeight={8} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                  <br />
                  {news.description3}
                </Typography>
              </CardContent>

            </Paper>
          </Grid> 
        ))}

      </Grid>
    </Box>

  );
}