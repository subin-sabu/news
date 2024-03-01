import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Grid } from '@mui/material';
import {cutText} from '../../Utils/cutText'
import newsArray from '../Assets/newsCopy';



export default function NewsCardXSCopy() {
  return (
    <Box sx={{ marginTop: '2rem', border:'1px solid beige', padding:'4px',borderRadius:'8px', backgroundColor:'#F7F7F7'}}>
      <Grid container
        rowSpacing={{ xs: 1, sm: 2, md: 3, }}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        justifyContent='center'>

        {newsArray.map((news, index) => (
          <Grid item key={index} xs={12}>
            <Card sx={{ maxWidth: 580, mx: 'auto' }}>
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
                  <Grid item xs={9}> 
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

