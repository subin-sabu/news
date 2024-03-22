import { Box, Container } from '@mui/material'
import React from 'react'
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <Box style={{ backgroundColor: '#181818', color: 'white', marginTop:'1rem'}}>
      <Container >
        <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'row wrap', paddingTop: '2rem' }}>
          ©2024, Reach Media. All Rights Reserved.
          <div className="social" style={{ width: '100%', display: 'flex', justifyContent: 'center' , paddingBottom:'1rem'}}>
            <YouTubeIcon style={{ paddingRight: '.5rem', paddingTop: '.4rem', }} /><FacebookIcon style={{ paddingRight: '.5rem', paddingTop: '.4rem', }} /><InstagramIcon style={{ paddingRight: '.5rem', paddingTop: '.4rem', }} />
          </div>
        </div>

      </Container >
    </Box>

  )
}

export default Footer