import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import './resets.css';

import { PublicClientApplication, EventType, LogLevel } from '@azure/msal-browser';


const pca = new PublicClientApplication({
  auth: {
      clientId: 'a80b6189-9f32-4685-9b9e-ea4c80c0a934',
      authority: 'https://login.microsoftonline.com/5820a236-7b49-481d-bade-d905e5a37875',
      redirectUri: '/',
      postLogoutRedirectUri: '/',
  },
  cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false,
  },
  system: {
      loggerOptions: {
          loggerCallback: (level, message, containsPII) => {
              console.log(message)
          },
          logLevel: LogLevel.Verbose
      }
  }
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App msalInstance={pca} />
  </StrictMode>,
);
