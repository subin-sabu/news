import React from 'react'
import NewsCard from '../Components/NewsCard/NewsCard'
import HomeAd1 from '../Advertisements/HomeAd1'
import NewsCardXS from '../Components/NewsCard/NewsCardXS'
import { Container, useMediaQuery, useTheme } from '@mui/material'
import MainNews from '../Components/MainNews/MainNews'
import Footer from '../Components/Footer/Footer'


function Home() {
  const theme = useTheme();
  const matchXS = useMediaQuery(theme.breakpoints.down('sm'));
  const aboveXS = useMediaQuery(theme.breakpoints.up('sm'));



  return (
    <div>
      <Container>

        <HomeAd1 />

        <MainNews />





        {matchXS && <NewsCardXS />}
        {aboveXS && <NewsCard />}

        
      </Container>
      <Footer />


    </div >
  )
}

export default Home