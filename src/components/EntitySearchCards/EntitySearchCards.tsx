// EntitySearchCard.tsx
import React from 'react';
import styles from './EntitySearchCards.module.css'; // Corrected module name

interface EntitySearchCardProps {
  entityName: string;
  entityOwner: string;
  entityFeatureCount: number;
  keyAttribute: string; // New prop for key attribute
}

const EntitySearchCards: React.FC<EntitySearchCardProps> = ({ entityName, entityOwner, entityFeatureCount, keyAttribute }) => {
  return (
    <div className={styles.entitySearchCard}>
      <div className={styles.entityDetails}>
        <h3>{entityName}</h3>
        <p>By: {entityOwner}</p>
        <p>Contains {entityFeatureCount} Features</p>
      </div>
      <div className={styles.keyAttribute}>
        <h4>Key Attribute :</h4>
        <p>{keyAttribute}</p>
      </div>
    </div>
  );
};

export default EntitySearchCards;
