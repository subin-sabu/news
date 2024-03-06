import React from 'react'
import Ad from './HomAd1.gif'
import { Link } from 'react-router-dom'


function HomeAd1() {
  return (
    <div style={{ marginTop: '1rem' }}>
      <Link to="https://vostekglobal.com/" alt='home ad1 link' style={{textDecoration:'none', color:'inherit'}}>
        <img style={{ width: '100%' }}
          src={Ad} alt="HomeAd1" />
      </Link>

    </div>
  )
}

export default HomeAd1