import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Roteamento from './routes';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Roteamento />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
