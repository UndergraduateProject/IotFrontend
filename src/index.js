import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Notification from './Notification'
import Chart from './Chart'


ReactDOM.render(
  <React.StrictMode>
    <App />
    <Notification />
  </React.StrictMode>,
  document.getElementById('root')
);