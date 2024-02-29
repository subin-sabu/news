import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import mainNews from '../Assets/main';



export default function MainNews() {
  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Grid container
        rowSpacing={{ xs: 1 }}
        columnSpacing={{ xs: 1 }}
        justifyContent='center'>

        {mainNews.map((news, index) => (
          <Grid item key={index} xs={12}    >
            <Link to='/News' style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card sx={{ maxWidth: 500, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                <CardContent sx={{ display:'flex', flexDirection:'row' ,textAlign:'center' }}>
                  <Typography  variant="body2" fontWeight='600' component="div" fontSize={17} >
                    {news.title}
                  </Typography>
                </CardContent>
                <CardMedia sx={{width:'100%', maxWidth:'100%'}}
                  component="img"
                  height="auto"
                  image={news.imageURL}
                  alt="news image"
                />
                <CardContent sx={{ height: '80%',display: 'flex', flexDirection: 'column'}}>
                  <Typography gutterBottom variant="caption" color='text.secondary' component="div" >
                    {news.time}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '5', WebkitBoxOrient: 'vertical' }}>
                    {news.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            </Link>
          </Grid>
        ))}

      </Grid>
    </Box>

  );
}
