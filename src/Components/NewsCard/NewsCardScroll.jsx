import React , {useContext} from 'react';
import { NewsContext } from '../../Context/NewsContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { styled } from '@mui/material/styles';
import styles from './NewsCard.module.css'


const InfiniteScrollContainer = styled(Box)(({ theme }) => ({
  overflowX: 'hidden',
  background: theme.palette.grey[200],
  position: 'relative',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    width: '10%',
    height: '100%',
    zIndex: 1,
  },
  '&::before': {
    left: 0,
    background: 'linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))',
  },
  '&::after': {
    right: 0,
    background: 'linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))',
  },
}));

const ScrollContent = styled('div')(({ theme }) => ({
  display: 'flex',
  cursor: 'grab',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  '-ms-overflow-style': 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

export default function NewsCardScroll({ startIndex, endIndex }) {
  
  const newsArray = useContext(NewsContext);

  const scrollRef = React.useRef(null);
  const [isHovering, setIsHovering] = React.useState(false);

  const doubledNewsArray = [...newsArray.slice(startIndex, endIndex), ...newsArray.slice(startIndex, endIndex)];

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { current: container } = scrollRef;
      const scrollAmount = direction === 'left' ? -container.offsetWidth / 4 : container.offsetWidth / 4;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isHovering && scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [isHovering]);

  //Calculating time for news cards
function formatTimestamp(timestamp) {
  const { seconds } = timestamp;
  const newsDate = new Date(seconds * 1000); // Convert Firestore timestamp to JavaScript Date
  const now = new Date();
  const differenceInSeconds = (now - newsDate) / 1000;
  const differenceInMinutes = differenceInSeconds / 60;
  const differenceInHours = differenceInMinutes / 60;
  const differenceInDays = differenceInHours / 24;

  if (differenceInSeconds < 60) {
    return 'Just now';
  } else if (differenceInMinutes < 60) {
    return `${Math.floor(differenceInMinutes)} minute${Math.floor(differenceInMinutes) === 1 ? '' : 's'} ago`;
  } else if (differenceInHours < 2) {
    return `1 hour ago`;
  } else if (differenceInHours < 24) {
    return `${Math.floor(differenceInHours)} hour${Math.floor(differenceInHours) === 1 ? '' : 's'} ago`;
  } else if (differenceInDays < 2) {
    return `1 day ago`;
  } else {
    return `${Math.floor(differenceInDays)} day${Math.floor(differenceInDays) === 1 ? '' : 's'} ago`;
  }
}

  return (
    <InfiniteScrollContainer
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <IconButton
        sx={{ position: 'absolute', top: '50%', left: 0, zIndex: 2, color: 'black', backgroundColor: 'white', '&:hover': { backgroundColor: 'grey.300' } }}
        onClick={() => handleScroll('left')}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        sx={{ position: 'absolute', top: '50%', right: 0, zIndex: 2, color: 'black', backgroundColor: 'white', '&:hover': { backgroundColor: 'grey.300' } }}
        onClick={() => handleScroll('right')}
      >
        <ArrowForwardIosIcon />
      </IconButton>
      <ScrollContent
        ref={scrollRef}
      >
        {doubledNewsArray.map((news, index) => (
          <Box key={index} sx={{ maxWidth: 260, flexShrink: 0, m: 1, textDecoration: 'none' }}>
            <Link to={`/News/${news.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <CardMedia component="img" height="140" image={news.thumbnailUrl} alt="news image" />
                  <CardContent>
                    <Typography gutterBottom variant="caption" color="text.secondary">
                    {formatTimestamp(news.timestamp)}
                    </Typography>
                    <Typography className='title-line-clamp' gutterBottom variant="body2" sx={{ fontWeight: '600'}}>
                      {news.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Box>
        ))}
      </ScrollContent>
    </InfiniteScrollContainer>
  );
}
