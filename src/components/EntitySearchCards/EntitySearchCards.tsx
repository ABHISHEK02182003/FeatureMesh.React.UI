// EntitySearchCard.tsx
import React, { useState } from 'react';
import styles from './EntitySearchCards.module.css'; // Corrected module name
import { EntityPage } from '../EntityPage/EntityPage';
import { Link } from 'react-router-dom';

interface EntitySearchCardProps {
  entityName: string;
  entityOwner: string;
  entityFeatureCount: number;
  keyAttribute: string; // New prop for key attribute
  entityJSON: any;
}

const EntitySearchCards: React.FC<EntitySearchCardProps> = ({ 
  entityName, entityOwner, entityFeatureCount, keyAttribute, entityJSON }) => {
  console.log(entityJSON);

  return (
    <Link to="../entity-page" className={styles.cardContainerLink}>
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
    </Link>
  );
};

export default EntitySearchCards;
