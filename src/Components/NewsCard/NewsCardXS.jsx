import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Grid } from '@mui/material';
import { Container } from '@mui/system';
import {cutText} from '../../Utils/cutText'




const newsArray = [
  {
    imageURL: 'https://img.manoramanews.com/content/dam/mm/mnews/news/breaking-news/images/2024/2/23/Byju-Raveendran23.jpg.image.624.325.jpg',
    time: '3 hours ago',
    title: '‘ബൈജൂസി’ല്‍ അസാധാരണ ജനറല്‍ ബോഡി; ബൈജുവിനെ പുറത്താക്കാന്‍ വോട്ട്...',
    description: 'ബൈജൂസ് ആപ്പില്‍ നിന്ന് ഉടമ ബൈജു രവീന്ദ്രനെ പുറത്താക്കാനുറച്ച് ഓഹരി ഉടമകള്‍. ബൈജൂസിന്റെ അസാധാരണ ജനറല...'
  },
  {
    imageURL: 'https://img.manoramanews.com/content/dam/mm/mnews/news/india/images/2022/10/4/election-commission-of-india.jpg.image.624.325.jpg',
    time: '6 hours ago',
    title: 'ലോക്സഭാ തിരഞ്ഞെടുപ്പ് പ്രഖ്യാപനം മാര്‍ച്ച് 13നോ അതിനുശേഷമോ ഉണ്ടായേക്കും..',
    description: 'ലോക്സഭാ തിരഞ്ഞെടുപ്പ് പ്രഖ്യാപനം മാര്‍ച്ച് 13നോ അതിന് ശേഷമോ ഉണ്ടായേക്കും. ഒരുക്കങ്ങള്‍ വിലയിരുത്താന്..'
  },
  {
    imageURL: 'https://www.manoramanews.com/content/dam/mm/mnews/news/india/images/2023/11/7/high%20court.jpg.image.845.440.jpg',
    time: '1 hour ago',
    title: 'സോഷ്യൽ ഫോറസ്ട്രിക്ക് ഓഫീസ്; മരം വെട്ടാനുള്ള നീക്കം ഹൈക്കോടതി തടഞ്ഞു...',
    description: 'കൊച്ചിയിൽ സോഷ്യൽ ഫോറസ്ട്രി വിഭാഗത്തിന് ഓഫീസ് നിർമ്മിക്കാൻ മരം വെട്ടാനുള്ള നീക്കം ഹൈക്കോടതി തടഞ്ഞു'
  },
  {
    imageURL: 'https://www.manoramanews.com/content/dam/mm/mnews/news/entertainment/images/2024/2/21/bramayugam-premalu.jpg.image.845.440.jpg',
    time: '10 hours ago',
    title: 'തിയറ്റര്‍ നിറച്ച് ‘പ്രേമയുഗം’ ; കോടിക്കിലുക്കത്തില്‍ മലയാള സിനിമ',
    description: 'ഭ്രമയുഗവും പ്രേമലുവും; 2024ലെ ആദ്യ വമ്പന്‍ ഹിറ്റുകള്‍, വീണ്ടും തിയറ്റര്‍ ആരവങ്ങളിലേക്ക് പ്രേക്ഷകരെ ത..'
  }

];


export default function NewsCard() {
  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Grid container
        rowSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        justifyContent='center'>

        {newsArray.map((news, index) => (
          <Grid item key={index} xs={12}>
            <Card sx={{ maxWidth: 400, mx: 'auto' }}>
              <CardActionArea>
                <Grid container direction="row">
                  <Grid item xs={3} my='auto' paddingLeft={1}>
                    <CardMedia
                      component="img"
                      height="60"
                      image={news.imageURL}
                      alt="news"
                      sx={{borderRadius:'5px'}}
                    />
                  </Grid>
                  <Grid item xs={9}> {/* Corrected the typo here */}
                    <CardContent>
                      <Typography variant="caption" color='text.secondary' component="div">
                        {news.time}
                      </Typography>
                      <Typography variant="body2" fontWeight='600'> {/* Changed variant to body2 for consistency */}
                        {cutText(news.title, 80)} {/* Corrected the function call */}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Card>
          </Grid>
        ))}

      </Grid>
    </Box>
  );
}
