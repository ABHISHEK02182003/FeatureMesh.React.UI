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

interface Props {
  entityData: any[];
  featureData: any[];
}


const SearchResults: React.FC<Props> = ({ entityData, featureData }) => {
  const entities: Entity[] = entityData.map((entity) => ({
    entityName: entity.name,
    entityKeyAttribute: entity.uniqueIdentifier,
    entityOwner: 'John Doe',
    entityFeatureCount: entity.feautureIds ? entity.feautureIds.length : 0,
  }));

  const features: Features[] = featureData.map((feature) => ({
    featureName: feature.name,
    entityName: feature.entityId,
    entityOwner: "John Doe",
    totalNoOfEntries: 100
  }));
  
  return (
    <div className={classes.searchResultsContainer}>
      <div className={classes.entitySearchResults}>
        <EntitySearchResults entities={entities} />
      </div>
      <div className={classes.featureSearchResults}>
        <FeatureSearchResults features={features}/>
      </div>
    </div>
  );
};

export default SearchResults;
