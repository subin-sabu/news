
import { Box, Container } from '@mui/material'
import React from 'react'
import reach from '../Assets/reach.PNG'

function Footer() {
  return (
    <div style={{background:'#181818'}}>
      <Container>
        <img src={reach} style={{maxWidth:'60px'}}/>
      </Container>
    </div>
  )
}

export default Footer