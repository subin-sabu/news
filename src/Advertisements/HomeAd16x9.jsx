import React from 'react'
import ad from "./kerala_vision_ad.jpeg"
import { Link } from 'react-router-dom'

function HomeAd16x9() {
  return (
    <div>
      <Link to='https://www.keralavisionisp.com/search-plans' alt='ad link' style={{textDecoration:'none', color:'inherit'}}>
      <img style={{aspectRatio:"16/9", maxWidth:'100%'}} src={ad} alt="home ad2 16*9" />
      </Link>
    </div>
  )
}

export default HomeAd16x9