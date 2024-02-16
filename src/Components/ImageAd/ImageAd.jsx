import React from 'react'
import { CardMedia, Container } from '@mui/material'
import AdImage from './Ad.gif'


function ImageAd() {
  return (
    <div >
        <Container style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
        <CardMedia
          component="img"
          src={AdImage}
          alt="Advertisement"
          style={{ width: '100%', height: 'auto', maxWidth: '900px' }}
          sx={{marginTop:'1.5rem'}}
        />
        
        </Container>
    </div>
  )
}

export default ImageAd