import React from 'react'
import NewsElaborate from '../Components/NewsElaborate/NewsElaborate'
import NewsAd1 from '../Advertisements/NewsAd1'
import { Grid, Box, Container } from '@mui/material'
import NewsCardVertical from '../Components/NewsCard/NewsCardVertical'
import {useParams} from 'react-router-dom'

function News() {
 const {id} = useParams(); //extract id from url
 

  return (
    <div>
      <Container>
        <NewsAd1 />
        <Grid container spacing={1} justifyContent={'center'} >
          <Grid item xs={12} md={8} >
            <Box>
               <NewsElaborate id={id} />  {/* pass id to NE */}
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{display:'flex', flexDirection:'column', marginTop:'25px' }}>
            <NewsCardVertical startIndex={1} endIndex={13}/>
          </Grid>
        </Grid>


      </Container>
    </div>
  )
}

export default News