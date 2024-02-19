import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { Container } from '@mui/system';
import {cutText} from '../../Utils/cutText'




const createNewsCard = [1, 2, 3, 4]


export default function NewsCard() {
  return (
    <Container sx={{ marginTop: '2rem' }}>
      <Grid container
        rowSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        justifyContent='center'>

        {createNewsCard.map((createNewsCard) => (
          <Grid item key={createNewsCard} xs={12}>
            <Card sx={{ maxWidth: 400, mx: 'auto' }}>
              <CardActionArea>
                <Grid container direction="row">
                  <Grid item xs={3} my='auto' paddingLeft={1}>
                    <CardMedia
                      component="img"
                      height="60"
                      image="https://img.manoramanews.com/content/dam/mm/mnews/news/kerala/images/2024/2/16/Mozha.jpg.image.260.136.jpg"
                      alt="news"
                      sx={{borderRadius:'5px'}}
                    />
                  </Grid>
                  <Grid Item xs={9}>
                    <CardContent>
                      <Typography variant="caption" color='text.secondary' component="div">
                        05:25 hours ago
                      </Typography>
                      <Typography variant="body3" fontWeight='600'>
                      {cutText("ആരാണ് മോഴയാനകള്‍? കൊമ്പനോ അതോ പിടിയോ?...", 40)}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Card>
          </Grid>
        ))}

      </Grid>
    </Container>

  );
}
