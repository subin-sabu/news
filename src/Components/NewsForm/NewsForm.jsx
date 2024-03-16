import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../firebase/config'; // Assuming db is correctly initialized elsewhere

// Initialize Storage
const storage = getStorage();

const NewsForm = () => {
  const [formValues, setFormValues] = useState({
    title: '',
    category: '',
    reporterName: '',
    tags: '',
    imageUrlOption: 'url',
    imageUrl: '',
    imageFile: null,
    imageCredit: '',
    videoUrlOption: 'url',
    videoUrl: '',
    videoFile: null,
    videoCredit: '',
    description1: '',
    description2: '',
    description3: '',
    description4: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // or "error"

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile" || name === "videoFile") {
      setFormValues(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormValues(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const uploadFile = async (file, path) => {
    if (!file) return null;
    const fileRef = ref(storage, `${path}/${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = formValues.imageUrlOption === 'upload' && formValues.imageFile
      ? await uploadFile(formValues.imageFile, 'images')
      : formValues.imageUrl || null;
    const videoUrl = formValues.videoUrlOption === 'upload' && formValues.videoFile
      ? await uploadFile(formValues.videoFile, 'videos')
      : formValues.videoUrl || null;

    const newsData = {
      ...formValues,
      imageUrl,
      videoUrl,
      tags: formValues.tags ? formValues.tags.split(',').map(tag => tag.trim()) : [],
      imageFile: null, // Excluded from Firestore, but set to null for consistency
      videoFile: null, // Excluded from Firestore, but set to null for consistency
      // Ensure other fields are set to null if they are empty
      title: formValues.title || null,
      category: formValues.category || null,
      reporterName: formValues.reporterName || null,
      imageCredit: formValues.imageCredit || null,
      videoCredit: formValues.videoCredit || null,
      description1: formValues.description1 || null,
      description2: formValues.description2 || null,
      description3: formValues.description3 || null,
      description4: formValues.description4 || null,
    };

    try {
      await addDoc(collection(db, "news"), newsData);
      setSnackbarMessage('News uploaded successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error uploading news: ', error);
      setSnackbarMessage('Error uploading news. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          News Entry Form
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
      <TextField
        label="Category"
        variant="outlined"
        name="category"
        value={formValues.category}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Reporter Name"
        variant="outlined"
        name="reporterName"
        value={formValues.reporterName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Tags (comma separated)"
        variant="outlined"
        name="tags"
        value={formValues.tags}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Image Source</FormLabel>
        <RadioGroup row name="imageUrlOption" value={formValues.imageUrlOption} onChange={handleRadioChange}>
          <FormControlLabel value="url" control={<Radio />} label="Image URL" />
          <FormControlLabel value="upload" control={<Radio />} label="Upload Image" />
        </RadioGroup>
        {formValues.imageUrlOption === 'url' ? (
          <TextField
            label="Image URL"
            variant="outlined"
            name="imageUrl"
            value={formValues.imageUrl}
            onChange={handleChange}
            fullWidth
          />
        ) : (
          <Button variant="contained" component="label">
            Upload Image
            <input type="file" hidden name="imageFile" onChange={handleChange} />
          </Button>
        )}
      </FormControl>
      <TextField
        label="Image Credit"
        variant="outlined"
        name="imageCredit"
        value={formValues.imageCredit}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {/* Similar setup for video URL and video upload */}
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Video Source</FormLabel>
        <RadioGroup row name="videoUrlOption" value={formValues.videoUrlOption} onChange={handleRadioChange}>
          <FormControlLabel value="url" control={<Radio />} label="Video URL" />
          <FormControlLabel value="upload" control={<Radio />} label="Upload Video" />
        </RadioGroup>
        {formValues.videoUrlOption === 'url' ? (
          <TextField
            label="Video URL"
            variant="outlined"
            name="videoUrl"
            value={formValues.videoUrl}
            onChange={handleChange}
            fullWidth
          />
        ) : (
          <Button variant="contained" component="label">
            Upload Video
            <input type="file" hidden name="videoFile" onChange={handleChange} />
          </Button>
        )}
      </FormControl>
      <TextField
        label="Video Credit"
        variant="outlined"
        name="videoCredit"
        value={formValues.videoCredit}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {/* Description fields */}
      <TextField
          label="Description 1"
          variant="outlined"
          name="description1"
          value={formValues.description1}
          onChange={handleChange}
          fullWidth
          multiline
          margin="normal"
        />
      <TextField
        label="Description 2"
        variant="outlined"
        name="description2"
        value={formValues.description2}
        onChange={handleChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
        label="Description 3"
        variant="outlined"
        name="description3"
        value={formValues.description3}
        onChange={handleChange}
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
        label="Description 4"
        variant="outlined"
        name="description4"
        value={formValues.description4}
        onChange={handleChange}
        fullWidth
        multiline
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NewsForm;
