// EntitySearchResults.tsx
import React from 'react';
import EntitySearchCard from '../EntitySearchCards/EntitySearchCards';
import styles from './EntitySearchResults.module.css'; // Import CSS module for styling

// Define Entity type
interface Entity {
    entityName : string;
    entityKeyAttribute : string;
    entityOwner : string;
    entityFeatureCount : number;
  }

interface EntitySearchResultsProps {
  entities: Entity[];
}

const EntitySearchResults: React.FC<EntitySearchResultsProps> = ({ entities }) => {
    return (
      <div className={styles.entitySearchResults}>
        <h2>Entities</h2>
        {entities.map(entity => (
          <EntitySearchCard
          key={entity.entityName} // Use a unique key for each entity
          entityName={entity.entityName} // Pass entityName
          entityOwner={entity.entityOwner} // Pass entityOwner
          entityFeatureCount={entity.entityFeatureCount} // Pass entityFeatureCount
          keyAttribute={entity.entityKeyAttribute} // Pass keyAttribute
        />
        ))}
      </div>
    );
  };
  

export default EntitySearchResults;
