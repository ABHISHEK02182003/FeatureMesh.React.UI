import React, { useEffect, useState } from 'react';
import classes from './SearchResults.module.css';
import EntitySearchResults from '../EntitySearchResults/EntitySearchResults';
import FeatureSearchResults from '../FeatureSearchResults/FeatureSearchResults';

// Define Entity type
interface Entity {
  entityName: string;
  entityKeyAttribute: string;
  entityOwner: string;
  entityFeatureCount: number;
  entityID: string;
}

interface Features {
  featureName: string;
  entityName: string;
  entityOwner: string;
  totalNoOfEntries: number;
  featureID: string;
}

interface Props {
  entityData: any[];
  featureData: any[];
}

const SearchResults: React.FC<Props> = ({ entityData, featureData }) => {
  const [features, setFeatures] = useState<Features[]>([]);

  useEffect(() => {
    const getEntityName = async (entityId: string) => {
      try {
        const response = await fetch(`https://featuremeshapis.azurewebsites.net/api/v1/entity/${entityId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch entity name');
        }
        const data = await response.json();
        return data.name;
      } catch (error) {
        console.error('Error fetching entity name:', error);
        return ''; 
      }
    };

    const fetchData = async () => {
      const updatedFeatures: Features[] = await Promise.all(featureData.map(async (feature) => {
        const entityName = await getEntityName(feature.entityId);
        return {
          featureName: feature.name,
          entityName: entityName,
          entityOwner: "John Doe",
          totalNoOfEntries: 100,
          featureID: feature.id
        };
      }));
      setFeatures(updatedFeatures);
    };

    fetchData();
  }, [featureData]);

  const entities: Entity[] = entityData.map((entity) => ({
    entityName: entity.name,
    entityKeyAttribute: entity.uniqueIdentifier,
    entityOwner: 'John Doe',
    entityFeatureCount: entity.feautureIds ? entity.feautureIds.length : 0,
    entityID: entity.id
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