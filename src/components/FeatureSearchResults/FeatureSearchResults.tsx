import React from 'react';
import FeatureSearchCards from '../FeatureSearchCards/FeatureSearchCards';
import styles from './FeatureSearchResults.module.css'; // Import CSS module for styling

interface Features {
    featureName : string;
    entityName : string;
    entityOwner : string;
    totalNoOfEntries : number;
  }
  
  interface FeatureSearchResultsProps {
    features: Features[];
  }
  
  const FeatureSearchResults: React.FC<FeatureSearchResultsProps> = ({ features }) => {
    return (
      <div className={styles.featureSearchResults}>
        <h2>Features</h2>
        {features.map(feature => (
          <FeatureSearchCards
            key={feature.featureName} 
            title={feature.featureName} // Display featureName as the title
            entityName = {feature.entityName}
            entityOwner = {feature.entityOwner}
            totalNoOfEntries = {feature.totalNoOfEntries}
          />
        ))}
      </div>
    );
  };
  
  
  export default FeatureSearchResults;
