import React from 'react';
import styles from "./CSS/Home.module.css"; // Import as a module
import HomeAd1 from '../Advertisements/HomeAd1';
import { Container, Box,  } from '@mui/material';
import MainNews from '../Components/MainNews/MainNews';
import NewsCardVertical from '../Components/NewsCard/NewsCardVertical';
import HomeAd16x9 from '../Advertisements/HomeAd16x9';
import NewsCard from '../Components/NewsCard/NewsCard';


function Home() {
  return (
    <div>
      <Container>
        <HomeAd1 />
        <div className={styles['grid-container']}>

          <NewsCardVertical startIndex={1} endIndex={7} heading='Latest News' className={styles.snippet1}/>
          <NewsCardVertical startIndex={1} endIndex={6} heading='Latest News' className={styles.snippet1reduced}/>

          <MainNews className={styles.main} />
          <NewsCard className={styles.newsCard} startIndex={0} endIndex={1} imageType="image"/>

          <NewsCardVertical startIndex={7} endIndex={13} heading='Must Read' className={styles.snippet2} />
          
         
          <HomeAd16x9  className={styles.ad2} />
          

        </div>
      </Container>
    </div>
  );
}

export default Home;
