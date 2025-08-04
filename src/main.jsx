import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


import './index.css';         
import './styles/utilities.css'; 
import './styles/main.css';    
import './styles/components.css'; 
import './styles/ManageEvents.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
