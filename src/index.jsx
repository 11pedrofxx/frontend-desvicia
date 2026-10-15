import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Roteamento from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Roteamento />
  </React.StrictMode>
);
