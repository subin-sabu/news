import React from 'react'
import NewsCard from '../Components/NewsCard/NewsCard'
import ImageAd from '../Components/ImageAd/ImageAd'
import NewsCardXS from '../Components/NewsCard/NewsCardXS'
import {useMediaQuery, useTheme} from '@mui/material'

function Home() {
const theme = useTheme();
const matchXS = useMediaQuery(theme.breakpoints.down('sm'));
const aboveXS = useMediaQuery(theme.breakpoints.up('sm'));



    return (
        <div>

            <ImageAd />
            {matchXS && <NewsCardXS />}
            {aboveXS && <NewsCard />}
            


        </div >
    )
}

export default Home