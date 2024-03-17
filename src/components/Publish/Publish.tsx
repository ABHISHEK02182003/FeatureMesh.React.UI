import React, { useState } from 'react';
import { EntityPublishPage } from '../EntityPublish/EntityPublish';
import { FeaturePublish } from '../FeaturePublish/FeaturePublish';
import ValuePublish from '../ValuePublish/ValuePublish';
import styles from './Publish.module.css'

const SidebarComponent = () => {
  const [selectedOption, setSelectedOption] = useState('Entity');

  const renderComponent = () => {
    switch (selectedOption) {
      case 'Entity':
        return <EntityPublishPage />;
      case 'Feature':
        return <FeaturePublish />;
      case 'Values':
        return <ValuePublish />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.publish_container}>
      <div className={styles.sidebar}>
        <ul>
          <li onClick={() => setSelectedOption('Entity')} className={selectedOption === 'Entity' ? styles.active : ''}>Entity</li>
          <li onClick={() => setSelectedOption('Feature')} className={selectedOption === 'Feature' ? styles.active : ''}>Feature</li>
          <li onClick={() => setSelectedOption('Values')} className={selectedOption === 'Values' ? styles.active : ''}>Values</li>
        </ul>
      </div>
      <div className={styles.content}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default SidebarComponent;
