import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import api from '../../api'; 
const NewsForm = () => {
  const [formValues, setFormValues] = useState({
    title: '',
    category: '',
    reporterName: '',
    tags: '',
    imageUrlOption: 'url', // 'url' or 'upload'
    imageUrl: '',
    imageFile: null,
    imageCredit: '',
    videoUrlOption: 'url', // 'url' or 'upload'
    videoUrl: '',
    videoFile: null,
    videoCredit: '',
    description1: '',
    description2: '',
    description3: '',
    description4: '',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(formValues).forEach(key => {
      if (key === 'tags' && formValues[key]) {
        formData.append(key, JSON.stringify(formValues[key].split(',').map(tag => tag.trim())));
      } else if ((key === 'imageFile' || key === 'videoFile') && formValues[key] !== null) {
        formData.append(key, formValues[key]);
      } else if (!key.includes('Option') && formValues[key] !== null) {
        formData.append(key, formValues[key]);
      }
    });

    try {
      const response = await api.post('/news', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      
      console.log(response.data);
      // Optionally, clear form/reset state or show success message here
    } catch (error) {
      console.error('Error submitting form: ', error);
      // Optionally, handle error/show error message here
    }
  };
  

  return (
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
  );
};

export default NewsForm;
