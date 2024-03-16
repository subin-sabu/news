import React from 'react'
import { Container } from '@mui/material'
import SignUp from '../Components/Admin Login/SignUp'
import SignIn from '../Components/Admin Login/SignIn'



function Sports() {
  return (
    <div>
      <Container>
        <SignUp/>
        <SignIn/>
      </Container>
    </div>
  )
}

export default Sports