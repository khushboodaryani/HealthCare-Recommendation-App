import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/style.css'; // Add global styles here
import './index.css'; // Make sure this import is in the correct file


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

