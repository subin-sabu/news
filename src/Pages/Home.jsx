import React from 'react';
import "./CSS/Home.css";
import HomeAd1 from '../Advertisements/HomeAd1';
import { Container, Box } from '@mui/material';
import MainNews from '../Components/MainNews/MainNews';
import NewsCardVertical from '../Components/NewsCard/NewsCardVertical';
import HomeAd16x9 from '../Advertisements/HomeAd16x9';


function Home() {
  return (
    <div>
      <Container>
        <HomeAd1 />
        <div className='grid-container'>
          <NewsCardVertical className='snippet1' startIndex={1} endIndex={7} />
          <MainNews className='main' />
          <NewsCardVertical className='snippet2' startIndex={7} endIndex={13} />
          <Box className='ad2' sx={{ width: '100%', display: { xs: 'block', sm: 'none' } }}>
            <HomeAd16x9 />
          </Box>
        </div>
      </Container>
    </div>
  );
}
export default Home