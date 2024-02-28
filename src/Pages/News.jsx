import React from 'react'
import NewsElaborate from '../Components/NewsElaborate/NewsElaborate'
import NewsAd1 from '../Advertisements/NewsAd1'
import { Container } from '@mui/material'

function News() {
  return (
    <div>
      <Container>
        <NewsAd1 />
        <NewsElaborate />
      </Container>
    </div>
  )
}

export default News