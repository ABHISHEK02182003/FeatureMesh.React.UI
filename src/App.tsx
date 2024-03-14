import React, { memo } from 'react';
import { useEffect } from "react";
import type { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import classes from './App.module.css';
import resets from './components/_resets.module.css';
import { LandingPage } from './components/LandingPage/LandingPage';
import { EntityPublishPage } from './components/EntityPublish/EntityPublish';
import Navbar from './components/Navbar/Navbar';
import { MsalProvider, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { SearchPage } from './components/SearchPage/SearchPage';

interface Props {
  className?: string;
  msalInstance: any;
}


export const App:FC<Props> = memo(function App({ msalInstance }) {
  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <div className={`${resets.clapyResets} ${classes.root}`}>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/publish/entity" element={<EntityPublishPage />} />
            <Route path="/search" element={<SearchPage />} />
            {/* Add more routes as needed */}
          </Routes>
          <Pages />
        </div>
      </Router>
    </MsalProvider>
  )
});

const Pages = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
      if (!isAuthenticated) {
          instance.ssoSilent({
              scopes: ["user.read"],
              // loginHint: "", 
          }).then((response) => {
              instance.setActiveAccount(response.account);
          }).catch(error => {
                  if (error instanceof InteractionRequiredAuthError) {
                      instance.loginRedirect();
                  }
              });
      }
  // eslint-disable-next-line
  }, []);

  return (
      <></>
  )
}