import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { Container } from '@mui/system';




const createNewsCard = [1, 2, 3, 4]


export default function NewsCard() {
  return (
    <Container sx={{ marginTop: '2rem' }}>
      <Grid container
        rowSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        justifyContent='center'>

        {createNewsCard.map((createNewsCard) => (
          <Grid item key={createNewsCard} xs={12} sm={6} md={4} lg={3}   >
            <Card sx={{ maxWidth: 345, mx: 'auto' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://img.manoramanews.com/content/dam/mm/mnews/news/kerala/images/2024/2/16/Mozha.jpg.image.260.136.jpg"
                  alt="news"
                />
                <CardContent>
                  <Typography gutterBottom variant="caption" color='text.secondary' component="div">
                    05:25 hours ago
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    ആരാണ് മോഴയാനകള്‍? കൊമ്പനോ അതോ പിടിയോ?...
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    കേരളം മുഴുവൻ കുറച്ചു ദിവസമായി ഒരു കൊലയാളി ആനയ്ക്ക് പുറകേയാണ്. ബേലൂർ മഖ്ന എന്ന മോഴയാന. ഇപ്പോഴിതാ...
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}

      </Grid>
    </Container>

  );
}
