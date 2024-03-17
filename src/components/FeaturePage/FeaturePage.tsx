import React, { useEffect, useState } from 'react';
import './FeaturePage.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
 
interface FeatureDetails {
    name: string;
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
        name: "",
        entityName: "",
        datatype: "",
        author: "John Doe",
        totalEntries: 0,
        description: "",
    });
    const [featureData, setFeatureData] = useState<any[]>([]);
    const [containsValues, setContainsValue] = useState(false);
 
    useEffect(() => {
        const fetchFeatureDetails = async () => {
            try {
                const response = await fetch(`https://featuremeshapis.azurewebsites.net/api/v1/Feature/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch feature details');
                }
                const data = await response.json();

                try {
                    const res=await axios.get(`https://featuremeshapis.azurewebsites.net/api/v1/Values?entityId=${data.entityId}`);
                    const entityData = res.data;

                    console.log(data.name);
                    const matchingFeature = entityData[0].features.find((feature: any) => feature.featureName === data.name);
                    if (matchingFeature) {
                        setFeatureData(matchingFeature.data); // Set feature data
                        setContainsValue(true);
                        console.log(matchingFeature.data);
                    }
                }
                catch (error) {
                    console.error('No feature Values');
                }

                setDetails({
                    name: data.name,
                    entityName: data.entityId,
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
                    <h2>{details.name}</h2>
                </div>
                <div className="feature-body">
                    <div className="feature-column feature-info">
                        <p><strong>Entity Name: </strong> {details.entityName}</p>
                        <p><strong>Datatype: </strong> {details.datatype}</p>
                        <p><strong>Total Entries: </strong> {details.totalEntries}</p>
                    </div>
                   
                    <div className="feature-column feature-description">
                        <h3>Description</h3>
                        <p>{details.description}</p>
                    </div>
                </div>
            </div>
           
            { containsValues && (
                <div className="feature-table-container">
                    <table className="feature-table">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {featureData.map((rowData, index) => (
                                <tr>
                                    <td>{ rowData.featureIdentifier}</td>
                                    <td>{rowData.featureValue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            { !containsValues && (<div className='error-message'>This feature contains no values</div>)}
            
            { containsValues && (
                <div className="feature-footer">
                    <select className="feature-dropdown">
                        <option value="csv">CSV</option>
                        <option value="excel">Excel</option>
                    </select>
                    <button className="feature-download-btn">Download</button>
                </div>
            )}
        </div>
    );
};