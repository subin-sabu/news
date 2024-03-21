import React from 'react';
import "./CSS/Home.css";
import HomeAd1 from '../Advertisements/HomeAd1';
import { Container, Box, Typography } from '@mui/material';
import MainNews from '../Components/MainNews/MainNews';
import NewsCardVertical from '../Components/NewsCard/NewsCardVertical';
import HomeAd16x9 from '../Advertisements/HomeAd16x9';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Breadcrumbs from '../Components/Breadcrumbs/Breadcrumbs'



function Home() {


  return (
    <div>
      <Container >
        <HomeAd1 />
        
        <div className='grid-container'>
        
            
            <NewsCardVertical startIndex={1} endIndex={7} heading='Latest News' className='snippet1'/>
       

          <MainNews className='main' />
         
            
            <NewsCardVertical startIndex={7} endIndex={13} heading='Must Read' className='snippet2' />
        

          <Box className='ad2' sx={{ width: '100%', display: { xs: 'block', sm: 'none' } }}>
            <HomeAd16x9 />
          </Box>
        </div>
      </Container>
    </div>
  );
}
export default Home