import React, { useState, useEffect } from 'react';
import resets from '../_resets.module.css';
import classes from './SearchPage.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

interface Props {
  className?: string;
}

export const SearchPage: React.FC<Props> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featureResults, setFeatureResults] = useState<any[]>([]);
  const [entityResults, setEntityResults] = useState<any[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setSearchPerformed(true);

    try {
      const featureResponse = await fetch(`https://featuremesharch.azurewebsites.net/search?type=Feature&name=${query}`);
      const featureData = await featureResponse.json();
      setFeatureResults(featureData);

      const entityResponse = await fetch(`https://featuremesharch.azurewebsites.net/search?type=Entity&name=${query}`);
      const entityData = await entityResponse.json();
      setEntityResults(entityData);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.sections}>
        <SearchBar onSearch={handleSearch} />
        <div className={classes.divider}></div>
        {searchPerformed && <SearchResults featureData={featureResults} entityData={entityResults} />}
      </div>
      {/* You can access searchQuery state here and use it as needed */}
    </div>
  );
};
