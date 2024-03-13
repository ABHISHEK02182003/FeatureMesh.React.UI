import React, { memo } from 'react';
import type { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import classes from './App.module.css';
import resets from './components/_resets.module.css';
import { SearchPage } from './components/SearchPage/SearchPage';
import Navbar from './components/Navbar/Navbar';

interface Props {
  className?: string;
}

export const App: FC<Props> = memo(function App(props = {}) {
  return (
    <Router>
      <div className={`${resets.clapyResets} ${classes.root}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
});
