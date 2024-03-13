import React from 'react'
import NewsForm from '../Components/NewsForm/NewsForm'
import { Container } from '@mui/material'

function LifeStyle() {
  return (
    <div>
      <Container sx={{pt:2,pb:2}}>
      <NewsForm/>
      </Container>
    </div>
  )
}

export default LifeStyle