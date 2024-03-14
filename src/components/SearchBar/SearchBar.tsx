// SearchPage.tsx

import React from 'react';
import styles from './SearchBar.module.css';

const SearchPage: React.FC = () => {
  return (
    <div className={styles.searchPage}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by Entity, Feature, or Author"
        />
        <button className={styles.searchButton}>Search</button>
      </div>
    </div>
  );
};

export default SearchPage;
