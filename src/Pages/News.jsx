import React , { useEffect } from 'react'
import NewsElaborate from '../Components/NewsElaborate/NewsElaborate'
import NewsAd1 from '../Advertisements/NewsAd1'
import { Grid, Box, Container, Typography } from '@mui/material'
import NewsCardVertical from '../Components/NewsCard/NewsCardVertical'
import {useParams} from 'react-router-dom'
import BasicBreadcrumbs from '../Components/Breadcrumbs/Breadcrumbs'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

function News() {
 const {id} = useParams(); //extract id from url
 
 useEffect(() => {
  window.scrollTo({top:0, behavior:'smooth'});
 }, [id]); //scrolls to top of News Page when id changes

  return (
    <div>
      <Container>
        <NewsAd1 />
        <Grid container spacing={1} justifyContent={'center'} >
          <Grid item xs={12} md={8} >
            <Box>
              <BasicBreadcrumbs page="News"/>
               <NewsElaborate id={id} />  {/* pass id to NE */}
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{display:'flex', flexDirection:'column', marginTop:'25px' }}>
          <Typography gutterBottom fontSize={20} fontWeight={600} color='primary.sub' style={{ display: 'flex', justifyContent: 'flex-start', gap: '.7rem' }}><ArrowCircleRightIcon />Recent updates</Typography>
            <NewsCardVertical startIndex={1} endIndex={13}/>
          </Grid>
        </Grid>


      </Container>
    </div>
  )
}

export default News