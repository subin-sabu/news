import React, { useState } from 'react';
import {useAuth} from '../../Context/AuthContext'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { collection, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../firebase/config'; //  db is correctly initialized in config file
import Resizer from 'react-image-file-resizer';



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
    heading1: '',
    description2: '',
    heading2: '',
    description3: '',
    heading3: '',
    description4: '',
    heading4: '',
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [videoPreview, setVideoPreview] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  //current user info is taken to get reporter's email
  const { currentUser } = useAuth();
  // console.log(currentUser.email)
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setFormValues(prev => ({ ...prev, [name]: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else if (name === "videoFile") {
      setFormValues(prev => ({ ...prev, [name]: files[0] }));
      setVideoPreview(URL.createObjectURL(files[0]));
    } else {
      setFormValues(prev => ({ ...prev, [name]: value }));
      if (name === "imageUrl") {
        setImagePreview(value);
      } else if (name === "videoUrl") {
        setVideoPreview(value);
      }
    }
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    if (name === "imageUrlOption" && value === "url") {
      setImagePreview(formValues.imageUrl);
    } else if (name === "videoUrlOption" && value === "url") {
      setVideoPreview(formValues.videoUrl);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  //  function for resizing and uploading images
  
  const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      200, // maxWidth
      150, // maxHeight
      'JPEG', // compressFormat
      100, // quality
      0, // rotation
      (uri) => {
        resolve(uri);
      },
      'file', // outputType
    );
  });


    const uploadResizedFile = async (file, path) => {
      if (!file) return null;
      const resizedImage = await resizeFile(file);
      return uploadFile(resizedImage, `${path}/thumbnails`);
    };

  const uploadFile = async (file, path) => {
    if (!file) return null;
    setLoading(true);
    const fileRef = ref(storage, `${path}/${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(snapshot.ref);
    setLoading(false);
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let thumbnailUrl = null;

    const imageUrl = formValues.imageUrlOption === 'upload' && formValues.imageFile
      ? await uploadFile(formValues.imageFile, 'images')
      : formValues.imageUrl || null;

     // Only resize and upload if imageFile exists
     if (formValues.imageFile && formValues.imageUrlOption === 'upload') {
      thumbnailUrl = await uploadResizedFile(formValues.imageFile, 'images');
    }


    const videoUrl = formValues.videoUrlOption === 'upload' && formValues.videoFile
      ? await uploadFile(formValues.videoFile, 'videos')
      : formValues.videoUrl || null;

    const newsData = {
      ...formValues,
      imageUrl,
      thumbnailUrl,
      videoUrl,
      timestamp: new Date(),
      tags: formValues.tags ? formValues.tags.split(',').map(tag => tag.trim()) : [],
      imageFile: null,
      videoFile: null,
      title: formValues.title || null,
      category: formValues.category || null,
      reporterName: formValues.reporterName || null,
      reporterEmail: currentUser.email,
      imageCredit: formValues.imageCredit || null,
      videoCredit: formValues.videoCredit || null,
      description1: formValues.description1 || null,
      heading1: formValues.heading1 || null,
      description2: formValues.description2 || null,
      heading2: formValues.heading2 || null,
      description3: formValues.description3 || null,
      heading3: formValues.heading3 || null,
      description4: formValues.description4 || null,
      heading4: formValues.heading4 || null,
    };

    try {
      const docRef = doc(collection(db, "news"), new Date().toISOString());
      await setDoc(docRef, newsData);
      setLoading(false);
      setSnackbarMessage('News uploaded successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error uploading news: ', error);
      setLoading(false);
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
          {formValues.imageUrlOption === 'upload' && (
            <>
              {imagePreview && (
                <>
                  <img src={imagePreview} alt="Preview" style={{ height: 100, width: 'auto', margin: '10px 0' }} />
                  <Typography variant="body2">{formValues.imageFile && formValues.imageFile.name}</Typography>
                </>
              )}
              <Button variant="contained" component="label">
                Upload Image
                <input type="file" hidden name="imageFile" onChange={handleChange} accept="image/*" />
              </Button>
            </>
          )}
          {formValues.imageUrlOption === 'url' && (
            <>
              <TextField
                label="Image URL"
                variant="outlined"
                name="imageUrl"
                value={formValues.imageUrl}
                onChange={handleChange}
                fullWidth
              />
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ height: 100, width: 'auto', margin: '10px 0' }} />}
            </>
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
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Video Source</FormLabel>
          <RadioGroup row name="videoUrlOption" value={formValues.videoUrlOption} onChange={handleRadioChange}>
            <FormControlLabel value="url" control={<Radio />} label="Video URL" />
            <FormControlLabel value="upload" control={<Radio />} label="Upload Video" />
          </RadioGroup>
          {formValues.videoUrlOption === 'upload' && (
            <>
              {videoPreview && (
                <>
                  <video src={videoPreview} controls style={{ height: 100, width: 'auto', margin: '10px 0' }} />
                  <Typography variant="body2">{formValues.videoFile && formValues.videoFile.name}</Typography>
                </>
              )}
              <Button variant="contained" component="label">
                Upload Video
                <input type="file" hidden name="videoFile" onChange={handleChange} accept="video/*" />
              </Button>
            </>
          )}
          {formValues.videoUrlOption === 'url' && (
            <>
              <TextField
                label="Video URL"
                variant="outlined"
                name="videoUrl"
                value={formValues.videoUrl}
                onChange={handleChange}
                fullWidth
              />
              {videoPreview && <video src={videoPreview} controls style={{ height: 100, width: 'auto', margin: '10px 0' }} />}
            </>
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
       {/* Dynamic Fields for Headings and Descriptions */}
       {Array.from({ length: 4 }).map((_, index) => (
          <React.Fragment key={index}>
            <TextField
              label={`Heading ${index + 1}`}
              variant="outlined"
              name={`heading${index + 1}`}
              value={formValues[`heading${index + 1}`]}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label={`Description ${index + 1}`}
              variant="outlined"
              name={`description${index + 1}`}
              value={formValues[`description${index + 1}`]}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
          </React.Fragment>
        ))}

      {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Submit'}
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