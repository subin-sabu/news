import React from 'react'
import { Container } from '@mui/material'
import NewsCard from '../Components/NewsCard/NewsCard'
import MainNews from '../Components/MainNews/MainNews'
import styles from './Sports.module.css'
import NewsCardScroll from '../Components/NewsCard/NewsCardScroll'
import NewsAd1 from '../Advertisements/NewsAd1'


function Sports() {
  return (
    <div>
      <Container sx={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div className={styles["grid-container"]}>
          <MainNews className="sports-main" startIndex={8} endIndex={9}  />
          <NewsCard className="sports-card" startIndex={9} endIndex={13} />
          <NewsCardScroll className="sports-scroll" startIndex={1} endIndex={7}/>
          <NewsAd1 className="sports-ad"/>
        </div>
      </Container>
    </div>
  )
}

export default Sports