import React, { useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search by Entity, Feature, or Author"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={styles.searchButton} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
