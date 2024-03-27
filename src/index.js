import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'
import './index.css';
import App from './App';

import { ThemeProvider } from '@mui/material/styles';
import  theme from './Theme'
import {NewsProvider} from './Context/NewsContext'
import { AuthProvider } from './Context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <HashRouter>
      <AuthProvider>
      <NewsProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      </NewsProvider>
      </AuthProvider>
    </HashRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
