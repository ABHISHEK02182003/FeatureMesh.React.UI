import React from 'react';
import './FeaturePage.css';


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
   
    const defaultDetails: FeatureDetails = {
        entityName: "Student",
        datatype: "String",
        author: "John Doe",
        totalEntries: 148,
        description: "Feature Description",
    };

    // Merge default values with provided props
    const details = { ...defaultDetails, ...featureDetails };

    //Temporary Json Data
    const FEATURES = [
        { FeatureId: "1", FeatureValue: "Feature 1" },
        { FeatureId: "2", FeatureValue: "Feature 2" },
        { FeatureId: "3", FeatureValue: "Feature 3" },
        
    ];
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