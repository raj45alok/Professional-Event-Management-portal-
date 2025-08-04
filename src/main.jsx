import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// CSS imports (optimized order)
import './index.css';         // Base/reset styles
import './styles/utilities.css'; // Utility classes first
import './styles/main.css';    // Global styles
import './styles/components.css'; // Component base styles
import './styles/ManageEvents.css'; // Page-specific styles

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);