import React from 'react'
import Ad from './HomAd1.gif'
import { Link } from 'react-router-dom'

//className prop helps apply custom css (eg. to hide in grid) when used in different pages. 
function HomeAd1({className}) {
  return (
    <div className={className} style={{ marginTop: '1rem' , marginBottom:'0.5rem'}}>
      <Link to="https://vostekglobal.com/" alt='home ad1 link' style={{textDecoration:'none', color:'inherit'}}>
        <img style={{ width: '100%' }}
          src={Ad} alt="HomeAd1" />
      </Link>

    </div>
  )
}

export default HomeAd1