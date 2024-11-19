import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './Router';
import axios from 'axios';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
