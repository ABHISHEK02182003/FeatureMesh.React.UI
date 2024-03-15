import React, { memo } from "react";
// eslint-disable-next-line
import type { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import classes from "./App.module.css";
import resets from "./components/_resets.module.css";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { EntityPublishPage } from "./components/EntityPublish/EntityPublish";
import Navbar from "./components/Navbar/Navbar";
// eslint-disable-next-line
import { MsalProvider, useIsAuthenticated, useMsal } from "@azure/msal-react";
// eslint-disable-next-line
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { SearchPage } from "./components/SearchPage/SearchPage";
import { EntityPage } from "./components/EntityPage/EntityPage";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Ensure you have this import for the CSS
import { FeaturePage } from "./components/FeaturePage/FeaturePage";
import ValuePublish from "./components/ValuePublish/ValuePublish";
import { FeaturePublish } from "./components/FeaturePublish/FeaturePublish";

interface Props {
  className?: string;
  msalInstance: any;
}
 
export const App: FC<Props> = memo(function App({ msalInstance }) {
  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <div className={`${resets.clapyResets} ${classes.root}`}>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/publish/entity" element={<EntityPublishPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/publish/values" element={<ValuePublish />} />
            <Route path="/publish/feature" element={<FeaturePublish />} />
            <Route path="/entity-page/:id" element={<EntityPage />} />
            <Route path="/feature-page/:id" element={<FeaturePage />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </MsalProvider>
  );
});
