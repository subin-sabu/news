import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, Paper, Box} from '@mui/material';
import { Container } from '@mui/system';




const newsArray = [{
  imageURL: 'https://www.keralatourism.org/images/nishagandhi-2024banner.webp',
  time: '3 hours ago',
  title: 'നിശാഗന്ധി നൃത്തോത്സവത്തിന് അരങ്ങുണര്‍ന്നു',
  description: 'തിരുവനന്തപുരം: ടൂറിസം വകുപ്പിന്റെ നിശാഗന്ധി നൃത്തോത്സവത്തിന് അരങ്ങുണര്‍ന്നു. ഇനി ഒരാഴ്ചക്കാലം അനന്തപുരിയുടെ സന്ധ്യകള്‍ ഇന്ത്യന്‍ ശാസ്ത്രീയ നൃത്ത വൈവിധ്യത്തിന് നൂപൂരധ്വനികള്‍ തീര്‍ക്കും. വിവിധ സംസ്ഥാനങ്ങളില്‍ നിന്നുള്ള ഭരതനാട്യം, കുച്ചിപ്പുടി, മോഹിനിയാട്ടം, മണിപ്പൂരി, സത്രിയ, കഥക്, ഒഡീസി തുടങ്ങി നൃത്തരംഗത്തെ പ്രഗത്ഭ കലാകാരന്‍മാര്‍ നിശാഗന്ധി നൃത്തോത്സവത്തിന്റെ ഭാഗമാകും. നൃത്തോത്സവത്തിലേക്കുള്ള പ്രവേശനം സൗജന്യമാണ്. നിശാഗന്ധി നൃത്തോത്സവത്തിന്റെ ഭാഗമായി കനകക്കുന്ന് കൊട്ടാരമുറ്റത്ത് എല്ലാ ദിവസവും വൈകിട്ട് 6.30 ന് നടക്കുന്ന കഥകളി മേളയില്‍ പ്രശസ്ത കലാകാരന്‍മാര്‍ അരങ്ങിലെത്തും. വ്യാഴം വൈകിട്ട് 6 ന് ജാനറ്റ് ജയിംസിന്റെ ഭരതനാട്യം, 6.45 ന് കൃഷ്ണാക്ഷി കശ്യപിന്റെ സത്രിയ, വെള്ളിയാഴ്ച 6 ന് അശ്വതി കൃഷ്ണയുടെ മോഹിനിയാട്ടം, 6.45 ന് പവിത്ര ഭട്ടിന്റെ ഭരതനാട്യം, 8 ന് പ്രൊഫ. ഡോ. ശ്രുതി ബന്ദോപാധ്യയയും സംഘവും അവതരിപ്പിക്കുന്ന മണിപ്പൂരി. ശനിയാഴ്ച 6 ന് രാംദാസിന്റെ ഭരതനാട്യം, 6.45 ന് ദീപ്തി ഓംചേരി ഭല്ലയുടെ മോഹിനിയാട്ടം, 8 ന് സയനി ചവ്ദയുടെ കഥക്.' }];


export default function NewsElaborate() {
  return (
    <Container sx={{ marginTop: '2rem' }}>
      <Grid container
        rowSpacing={{ xs: 1 }}
        columnSpacing={{ xs: 1 }}
        justifyContent='center'>

        {newsArray.map((news, index) => (
          <Grid item key={index} xs={12}    >
            <Paper sx={{ maxWidth: '100%', height: '100%', display: 'flex', flexDirection: 'column',backgroundColord:'white'}}>
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

                <CardContent sx={{ display:'flex',justifyContent:'center' }}>
                  <Typography gutterBottom  variant="h5" fontWeight='500' component="div" sx={{ mb: 1 }}>
                    {news.title}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  height="300"
                  image={news.imageURL}
                  alt="news image"
                />
                <CardContent sx={{ height: '80%',display: 'flex', flexDirection: 'column', justifyContent:'space-around' }}>
                  <Typography gutterBottom variant="caption" color='text.secondary' component="div" >
                    {news.time}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                    {news.description}
                  </Typography>
                </CardContent>
              </Box>
            </Paper>
          </Grid>
        ))}

      </Grid>
    </Container>

  );
}
