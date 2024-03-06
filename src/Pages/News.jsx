import React from 'react'
import NewsElaborate from '../Components/NewsElaborate/NewsElaborate'
import NewsAd1 from '../Advertisements/NewsAd1'
import { Grid, Box, Container } from '@mui/material'
import NewsCardVertical from '../Components/NewsCard/NewsCardVertical'

function News() {
  return (
    <div>
      <Container>
        <NewsAd1 />
        <Grid container spacing={1} justifyContent={'center'} >
          <Grid item xs={12} md={8} >
            <Box>
              <NewsElaborate />
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