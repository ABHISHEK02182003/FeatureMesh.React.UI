// EntitySearchCard.tsx
import React, { useState, useEffect } from 'react';
import styles from './EntitySearchCards.module.css';
// eslint-disable-next-line
import { EntityPage } from '../EntityPage/EntityPage';
import { Link } from 'react-router-dom';

interface EntitySearchCardProps {
  entityName: string;
  entityOwner: string;
  entityFeatureCount: number;
  keyAttribute: string;
  entityID: string;
}

const EntitySearchCards: React.FC<EntitySearchCardProps> = ({ 
  entityName, entityOwner, entityFeatureCount, keyAttribute, entityID }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <Link to={`../entity-page/${entityID}`} className={styles.cardContainerLink}>
      <div className={styles.entitySearchCard}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className={styles.entityDetails}>
              <h3>{entityName}</h3>
              <p>By: {entityOwner}</p>
              <p>Contains {entityFeatureCount} Features</p>
            </div>
            <div className={styles.keyAttribute}>
              <h4>Key Attribute :</h4>
              <p>{keyAttribute}</p>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default EntitySearchCards;
