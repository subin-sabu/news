import React from 'react'
import NewsElaborate from '../Components/NewsElaborate/NewsElaborate'
import NewsAd1 from '../Advertisements/NewsAd1'
import { Grid, Box, Container } from '@mui/material'
import NewsCard from '../Components/NewsCard/NewsCard'

function News() {
  return (
    <div>
      <Container>
        <NewsAd1 />
        <Grid container spacing={1} justifyContent={'center'} >
          <Grid item md={9} >
            <Box>
              <NewsElaborate />
            </Box>

          </Grid>
          <Grid item md={3} sx={{display:'flex', flexDirection:'column', }}>
            <NewsCard/>
          </Grid>
        </Grid>


      </Container>
    </div>
  )
}

export default News