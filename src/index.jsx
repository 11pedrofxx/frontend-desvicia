import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Roteamento from './routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Toaster 
  position='top-right' 
  reverseOrder={false} 
  toastOptions={{
    className: 'toast-desvicia',
    duration: 4000,
  }}
/>  
      <Roteamento />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
