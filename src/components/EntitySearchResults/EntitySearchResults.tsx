// EntitySearchResults.tsx
import React, { useState, useEffect } from 'react';
import EntitySearchCard from '../EntitySearchCards/EntitySearchCards';
import styles from './EntitySearchResults.module.css';

interface Entity {
    entityID: string;
    entityName : string;
    entityKeyAttribute : string;
    entityOwner : string;
    entityFeatureCount : number;
}

interface EntitySearchResultsProps {
    entities: Entity[];
}

const EntitySearchResults: React.FC<EntitySearchResultsProps> = ({ entities }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.entitySearchResults}>
            <h2>Entities</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                entities.length > 0 ? (
                    entities.map((entity) => (
                        <EntitySearchCard
                            entityName={entity.entityName}
                            entityOwner={entity.entityOwner}
                            entityFeatureCount={entity.entityFeatureCount}
                            keyAttribute={entity.entityKeyAttribute}
                            entityID={entity.entityID}
                        />
                    ))
                ) : (
                    <p>No Results Found</p>
                )
            )}
        </div>
    );
};

export default EntitySearchResults;
