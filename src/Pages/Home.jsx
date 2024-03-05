import React from 'react';
import "./CSS/Home.css";
import HomeAd1 from '../Advertisements/HomeAd1';
import { Container } from '@mui/material';
import MainNews from '../Components/MainNews/MainNews';
import NewsCardTestCopy from '../Components/NewsCard/NewsCardTestCopy';


function Home() {
  return (
    <div>
      <Container>
        <HomeAd1 />
        <div className='grid-container'>
          <NewsCardTestCopy className='snippet1'/>
          <MainNews className='main' />
          <NewsCardTestCopy className='snippet2'/>
        </div>
      </Container>
    </div>
  );
}
export default Home