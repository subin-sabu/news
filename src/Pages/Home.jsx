import React from 'react'
import NewsCard from '../Components/NewsCard/NewsCard'
import HomeAd1 from '../Advertisements/HomeAd1'
import NewsCardXS from '../Components/NewsCard/NewsCardXS'
import { Container, useMediaQuery, useTheme } from '@mui/material'
import MainNews from '../Components/MainNews/MainNews'

function Home() {
  const theme = useTheme();
  const matchXS = useMediaQuery(theme.breakpoints.down('sm'));
  const aboveXS = useMediaQuery(theme.breakpoints.up('sm'));



  return (
    <div>
      <Container>

        <HomeAd1/>

        <MainNews />

        {matchXS && <NewsCardXS />}
        {aboveXS && <NewsCard />}

      </Container>


    </div >
  )
}

export default Home