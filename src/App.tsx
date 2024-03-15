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
import { EntityPage } from './components/EntityPage/EntityPage';

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
            <Route path="/entity-page" element={<EntityPage />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </MsalProvider>
  )
});
