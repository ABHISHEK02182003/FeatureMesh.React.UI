// SearchPage.tsx
import React from 'react';
import './SearchFirst.css';

export const SearchPage: React.FC = () => {
 return (
    <div className="search-page">
      <div className="heading">
      <h1>Explore Features</h1>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by Entity, Feature or Author"
        />
        <button className="search-button">Search</button>
      </div>
    </div>
 );
};


