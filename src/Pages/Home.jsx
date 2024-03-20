import React from 'react';
import "./CSS/Home.css";
import HomeAd1 from '../Advertisements/HomeAd1';
import { Container, Box, Typography } from '@mui/material';
import MainNews from '../Components/MainNews/MainNews';
import NewsCardVertical from '../Components/NewsCard/NewsCardVertical';
import HomeAd16x9 from '../Advertisements/HomeAd16x9';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';




function Home() {


  return (
    <div>
      <Container >
        <HomeAd1 />
        <div className='grid-container'>
          <div className='snippet1' >
            <Typography gutterBottom fontSize={20} fontWeight={600} color='primary.sub' style={{ display: 'flex', justifyContent: 'flex-start', gap: '.7rem' }}><ArrowCircleRightIcon />Latest News</Typography>
            <NewsCardVertical startIndex={1} endIndex={7} />
          </div>

          <MainNews className='main' />
          <div className='snippet2'>
            <Typography gutterBottom fontSize={20} fontWeight={600} color='primary.sub' style={{ display: 'flex', justifyContent: 'flex-start', gap: '.7rem' }}><ArrowCircleRightIcon /> Must Read</Typography>
            <NewsCardVertical startIndex={7} endIndex={13} />
          </div>

          <Box className='ad2' sx={{ width: '100%', display: { xs: 'block', sm: 'none' } }}>
            <HomeAd16x9 />
          </Box>
        </div>
      </Container>
    </div>
  );
}
export default Home