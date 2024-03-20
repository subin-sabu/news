import React from 'react'
import NewsForm from '../Components/NewsForm/NewsForm'
import { Container } from '@mui/system'

function ReportNews() {
  return (
    <div>
      <Container sx={{pt:2,pb:2}}>
      <NewsForm/>
      </Container>
    </div>
  )
}

export default ReportNews