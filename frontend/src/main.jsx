import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Adjust the import based on your file structure
import './index.css'; // Adjust the import based on your file structure

// Get the root element from the DOM
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

// Render your application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
