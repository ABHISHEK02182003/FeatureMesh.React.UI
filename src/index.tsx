// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './resets.css';
import { PublicClientApplication, EventType, LogLevel } from '@azure/msal-browser';
import { saveToken, getToken } from './tokenStorage'; // Adjust the import path as necessary

const pca = new PublicClientApplication({
 auth: {
    clientId: 'a80b6189-9f32-4685-9b9e-ea4c80c0a934',
    authority: 'https://login.microsoftonline.com/5820a236-7b49-481d-bade-d905e5a37875',
    redirectUri: '/',
    postLogoutRedirectUri: '/',
 },
 cache: {
    cacheLocation: 'localStorage', // This line is kept for MSAL's internal caching, but tokens will be saved to IndexedDB
    storeAuthStateInCookie: false,
 },
 system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPII) => {
        console.log(message);
      },
      logLevel: LogLevel.Verbose,
    },
 },
});

// Adjusted to correctly handle the token extraction and saving
async function handleAuthentication() {
 const token = retrieveToken();
 if (token) {
   // Save the token to IndexedDB
   await saveToken(token);
 }
}

function retrieveToken() {
 for(let i=0;i<localStorage.length;i++){
    const key = localStorage.key(i);
    if (key !== null) {
      var value = localStorage.getItem(key);
      if(value !== null) {
        var jsonObject = JSON.parse(value);
        if('credentialType' in jsonObject && jsonObject['credentialType'] === 'IdToken') {
          console.log(jsonObject['secret']);
          localStorage.setItem('token',jsonObject['secret']);
          return jsonObject['secret'];
        }
      }
    }
 }
 return null; // Return null if no token is found
}

handleAuthentication().then(() => {
 // You can add any additional logic here after the token is saved
});

createRoot(document.getElementById('root')!).render(
 <StrictMode>
    <App msalInstance={pca} />
 </StrictMode>,
);
