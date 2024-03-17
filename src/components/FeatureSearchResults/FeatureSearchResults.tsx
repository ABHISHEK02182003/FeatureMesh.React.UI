import React, { useState, useEffect } from 'react';
import FeatureSearchCards from '../FeatureSearchCards/FeatureSearchCards';
import styles from './FeatureSearchResults.module.css';

interface Features {
    featureName : string;
    entityName : string;
    entityOwner : string;
    totalNoOfEntries : number;
    featureID: string;
}

interface FeatureSearchResultsProps {
    features: Features[];
}

const FeatureSearchResults: React.FC<FeatureSearchResultsProps> = ({ features }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.featureSearchResults}>
            <h2>Entities with this Feature</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                features.length > 0 ? (
                    features.map((feature) => (
                        <FeatureSearchCards
                            featureName={feature.featureName}
                            title={feature.entityName}
                            entityName={feature.entityName}
                            entityOwner={feature.entityOwner}
                            totalNoOfEntries={feature.totalNoOfEntries}
                            featureID={feature.featureID}
                        />
                    ))
                ) : (
                    <p>No Results Found</p>
                )
            )}
        </div>
    );
};

export default FeatureSearchResults;
