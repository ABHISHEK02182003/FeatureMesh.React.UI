// SearchPage.tsx
import { useState, useEffect } from 'react';
import React from 'react';
import styles from './SearchBar.module.css';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featureResults, setFeatureResults] = useState([]);
  const [entityResults, setEntityResults] = useState([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const fetchData = async () => {
    const featureUrl = `https://featuremesharch.azurewebsites.net/search?type=Feature&name=${searchQuery}`;
    const entityUrl = `https://featuremesharch.azurewebsites.net/search?type=Entity&name=${searchQuery}`;

    const featureResponse = await fetch(featureUrl);
    const featureData = await featureResponse.json();
    setFeatureResults(featureData);

    const entityResponse = await fetch(entityUrl);
    const entityData = await entityResponse.json();
    setEntityResults(entityData);

    if (featureResults) {
      console.log("Searched");
    }
  };

  const handleSearchClick = () => {
    fetchData();
  };

  return (
    <div className={styles.searchPage}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by Entity, Feature, or Author"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className={styles.searchButton}>Search</button>
      </div>
    </div>
  );
};

export default SearchPage;
