import React, { useEffect, useState } from 'react';
import './FeaturePage.css';
import { useParams } from 'react-router-dom';

interface FeatureDetails {
    entityName: string;
    datatype: string;
    author: string;
    totalEntries: number;
    description: string;
}

interface FeaturePageProps {
    featureDetails?: FeatureDetails;
}

export const FeaturePage: React.FC<FeaturePageProps> = ({ featureDetails }) => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [details, setDetails] = useState<FeatureDetails>({
        entityName: "",
        datatype: "",
        author: "John Doe",
        totalEntries: 0,
        description: "",
    });

    useEffect(() => {
        const fetchFeatureDetails = async () => {
            try {
                const response = await fetch(`https://featuremeshapis.azurewebsites.net/api/v1/Feature/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch feature details');
                }
                const data = await response.json();
                setDetails({
                    entityName: data.name,
                    datatype: data.dataType,
                    author: "John Doe",
                    totalEntries: 150,
                    description: data.description,
                });
            } catch (error) {
                console.error('Error fetching feature details:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatureDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching feature details</div>;
    }

    return (
        <div className="page-container">
            <div className="feature-container">
                <div className="feature-header">
                    <h2>{details.entityName}</h2>
                </div>
                <div className="feature-body">
                    <div className="feature-column feature-info">
                        <p><strong>Entity Name: </strong> {details.entityName}</p>
                        <p><strong>Datatype: </strong> {details.datatype}</p>
                        <p><strong>Author: </strong> {details.author}</p>
                        <p><strong>Total Entries: </strong> {details.totalEntries}</p>
                    </div>
                    <div className="feature-column feature-description">
                        <h3>Description</h3>
                        <p>{details.description}</p>
                    </div>
                </div>
            </div>
            <div className="feature-footer">
                <select className="feature-dropdown">
                    <option value="csv">CSV</option>
                    <option value="excel">Excel</option>
                </select>
                <button className="feature-download-btn">Download</button>
            </div>
        </div>
    );
};
