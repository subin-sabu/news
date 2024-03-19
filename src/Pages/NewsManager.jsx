import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../firebase/config'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogTitle, Typography, IconButton, Menu, MenuItem, CircularProgress, Snackbar, useMediaQuery } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@mui/material/styles';

const NewsManager = () => {
  const [newsList, setNewsList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [currentNews, setCurrentNews] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setLoading(true);
    const fetchNews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'news'));
        setNewsList(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        setSnackbar({ open: true, message: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleMenuClick = (event, news) => {
    setCurrentNews(news);
    setCurrentId(news.id);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const deleteFiles = async (news) => {
    const promises = [];
    if (news.imageFile) {
      const imageRef = ref(storage, news.imageFile);
      promises.push(deleteObject(imageRef));
    }
    if (news.videoFile) {
      const videoRef = ref(storage, news.videoFile);
      promises.push(deleteObject(videoRef));
    }
    await Promise.all(promises);
  };

  const handleDelete = async () => {
    setOpenDialog(false);
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'news', currentId));
      await deleteFiles(currentNews);
      setNewsList(newsList.filter(news => news.id !== currentId));
      setSnackbar({ open: true, message: 'News successfully deleted' });
    } catch (error) {
      setSnackbar({ open: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const openDeleteDialog = (news) => {
    setCurrentNews(news);
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom component="div" sx={{ textAlign: 'center' }}>
        News Manager
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="news table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Title</TableCell>
              {!mobileView && (
                <>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </>
              )}
              {mobileView && <TableCell></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {newsList.map((news, index) => (
              <TableRow key={news.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{news.title}</TableCell>
                {!mobileView && (
                  <>
                    <TableCell>
                      <Button onClick={() => {/* Navigate to edit page */}} style={{ color: 'green' }}>
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => openDeleteDialog(news)} style={{ color: 'red' }}>
                        Delete
                      </Button>
                    </TableCell>
                  </>
                )}
                {mobileView && (
                  <TableCell>
                    <IconButton onClick={(event) => handleMenuClick(event, news)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => {/* Navigate to edit page */}} style={{ color: 'green' }}>Edit</MenuItem>
                      <MenuItem onClick={() => openDeleteDialog(news)} style={{ color: 'red' }}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this news? This action is irreversible."}</DialogTitle>
        <DialogActions>
          <Button onClick={handleDialogClose} style={{ color: 'green' }}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus style={{ color: 'red' }}>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
};

export default NewsManager;
