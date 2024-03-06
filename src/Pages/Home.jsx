import React from 'react';
import "./CSS/Home.css";
import HomeAd1 from '../Advertisements/HomeAd1';
import { Container } from '@mui/material';
import MainNews from '../Components/MainNews/MainNews';
import NewsCardVertical from '../Components/NewsCard/NewsCardVertical';


function Home() {
  return (
    <div>
      <Container>
        <HomeAd1 />
        <div className='grid-container'>
          <NewsCardVertical className='snippet1' startIndex={1} endIndex={7}/>
          <MainNews className='main' />
          <NewsCardVertical className='snippet2' startIndex={7} endIndex={13}/>
        </div>
      </Container>
    </div>
  );
}
export default Home