import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogTitle, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const NewsManager = () => {
  const [newsList, setNewsList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchNews = async () => {
      const querySnapshot = await getDocs(collection(db, 'news'));
      const newsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNewsList(newsData);
    };

    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'news', id));
    setNewsList(newsList.filter(news => news.id !== id));
    setOpenDialog(false);
  };

  const openDeleteDialog = (id) => {
    setCurrentId(id);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom component="div" sx={{ textAlign: 'center' }}>
        News Manager
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="news table" responsive>
          <TableHead>
            <TableRow>
              <TableCell>SI.NO.</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newsList.map((news, index) => (
              <TableRow key={news.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{news.title}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => {/* Navigate to edit page */}}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => openDeleteDialog(news.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to delete this news? This action is irreversible."}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDialogClose} style={{ color: 'green' }}>
            Cancel
          </Button>
          <Button onClick={() => handleDelete(currentId)} style={{ color: 'red' }} autoFocus>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewsManager;
