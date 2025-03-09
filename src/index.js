// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // <-- Use `react-dom/client` instead of `react-dom`
import './index.css';
import App from './App2';

const root = ReactDOM.createRoot(document.getElementById('root')); // <-- Use `createRoot`
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
