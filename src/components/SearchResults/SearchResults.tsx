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
  entityID: string;
}

interface Features {
  featureName : string;
  entityName : string;
  entityOwner : string;
  totalNoOfEntries : number;
  featureID: string;
}

interface Props {
  entityData: any[];
  featureData: any[];
}


const SearchResults: React.FC<Props> = ({ entityData, featureData }) => {
  console.log('Hello', entityData);

  const entities: Entity[] = entityData.map((entity) => ({
    entityName: entity.name,
    entityKeyAttribute: entity.uniqueIdentifier,
    entityOwner: 'John Doe',
    entityFeatureCount: entity.FeatureIds ? entity.FeatureIds.length : 0,
    entityID: entity.id
  }));

  const features: Features[] = featureData.map((feature) => ({
    featureName: feature.name,
    entityName: feature.entityId,
    entityOwner: "John Doe",
    totalNoOfEntries: 100,
    featureID: feature.id
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
