import React, { useEffect, useState } from 'react';
import styles from './FeatureSearchCards.module.css';
import { Link } from 'react-router-dom';

interface FeatureSearchCardProps {
  featureName: string;
  title: string;
  entityName: string;
  entityOwner: string;
  totalNoOfEntries: number;
  featureID: string;
}

const FeatureSearchCards: React.FC<FeatureSearchCardProps> = ({ featureName, title, entityOwner, totalNoOfEntries, featureID }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading effect with setTimeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);
  return (
    <Link to={`../feature-page/${featureID}`} className={styles.cardContainerLink}>
      <div className={styles.featureSearchCard}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className={styles.featureDetails}>
              <h3>{title}</h3>
              <p>Feature: {featureName}</p>
            </div>
            <div className={styles.verticalLine}></div>
            <div className={styles.ownerDetails}>
              <p className={styles.ownerName}>By: {entityOwner}</p>
              <p className={styles.entriesCount}>Contains {totalNoOfEntries} entries</p>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default FeatureSearchCards;
