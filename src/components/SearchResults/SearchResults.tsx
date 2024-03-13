import React from 'react';
import classes from './SearchResults.module.css';
import EntitySearchResults from '../EntitySearchResults/EntitySearchResults'
import FeatureSearchResults from '../FeatureSearchResults/FeatureSearchResults';

// Define Entity type
interface Entity {
  entityName : string;
  entityKeyAttribute : string;
  entityOwner : string;
  entityFeatureCount : number;
}

interface Features {
  featureName : string;
  entityName : string;
  entityOwner : string;
  totalNoOfEntries : number;
}

// Dummy data for entities
const dummyEntities: Entity[] = [
  {
    entityName: 'Entity 1',
    entityKeyAttribute: 'Key Attribute 1',
    entityOwner: 'Owner 1',
    entityFeatureCount: 10
  },
  {
    entityName: 'Entity 2',
    entityKeyAttribute: 'Key Attribute 2',
    entityOwner: 'Owner 2',
    entityFeatureCount: 20
  },
  {
    entityName: 'Entity 3',
    entityKeyAttribute: 'Key Attribute 3',
    entityOwner: 'Owner 3',
    entityFeatureCount: 15
  }
];

const dummyFeatures: Features[] = [
  {
    featureName: 'Feature 1',
    entityName: 'Entity 1',
    entityOwner: 'Owner 1',
    totalNoOfEntries: 100
  },
  {
    featureName: 'Feature 2',
    entityName: 'Entity 2',
    entityOwner: 'Owner 2',
    totalNoOfEntries: 150
  },
  {
    featureName: 'Feature 3',
    entityName: 'Entity 3',
    entityOwner: 'Owner 3',
    totalNoOfEntries: 200
  }
];

const SearchResults: React.FC = () => {
  return (
    <div className={classes.searchResultsContainer}>
      <div className={classes.entitySearchResults}>
        <EntitySearchResults entities={dummyEntities} />
      </div>
      <div className={classes.featureSearchResults}>
        <FeatureSearchResults features={dummyFeatures}/>
      </div>
    </div>
  );
};

export default SearchResults;
