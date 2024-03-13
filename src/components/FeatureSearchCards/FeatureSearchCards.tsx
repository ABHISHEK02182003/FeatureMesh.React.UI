// FeatureSearchCards.tsx
import React from 'react';
import styles from './FeatureSearchCards.module.css';

interface FeatureSearchCardProps {
  title: string;
  entityName: string; // Add entityName prop
  entityOwner: string; // Add entityOwner prop
  totalNoOfEntries: number; // Add totalNoOfEntries prop
}

const FeatureSearchCards: React.FC<FeatureSearchCardProps> = ({ title, entityName, entityOwner, totalNoOfEntries }) => {
  return (
    <div className={styles.featureSearchCard}>
      <div className={styles.featureDetails}>
        <h3>{title}</h3>
        <p>Entity: {entityName}</p>
      </div>
      <div className={styles.verticalLine}></div>
      <div className={styles.ownerDetails}>
        <p className = {styles.ownerName}>By: {entityOwner}</p>
        <p className = {styles.entriesCount}>Contains {totalNoOfEntries} entries</p>
      </div>
    </div>
  );
};

export default FeatureSearchCards;
