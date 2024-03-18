import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "./EntityPage.css"; // Import the CSS file
 
// Define the shape of the entity details prop
interface EntityDetails {
    id: string;
    name: string;
    author: string;
    createdAt: string;
    lastUpdatedAt: string;
    context: string;
    feautureIds: string[] | null;
}
 
// Define the props for the EntityPage component
interface EntityPageProps {
    entityDetails?: EntityDetails;
}
 
// Define the EntityPage component
export const EntityPage: React.FC<EntityPageProps> = ({ entityDetails }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [details, setDetails] = useState<EntityDetails>({
        name: "N/A",
        id: "N/A",
        author: "John Doe",
        createdAt: "N/A",
        lastUpdatedAt: "N/A",
        context: "N/A",
        feautureIds: null
    });
    const [disableDownload, setDisableDownload] = useState(true);
    const [downloadType, setDownloadType] = useState<string>("CSV"); // Default download type is CSV
 
    useEffect(() => {
        const fetchEntityDetails = async () => {
            try {
                const response = await fetch(`https://featuremeshapis.azurewebsites.net/api/v1/Entity/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch entity details');
                }
                const data = await response.json();
                setDetails({
                    name: data.name,
                    id: data.id,
                    author: "John Doe",
                    createdAt: data.created,
                    lastUpdatedAt: data.updated,
                    context: data.description,
                    feautureIds: data.feautureIds,
                });
                setDisableDownload(!data.feautureIds || data.feautureIds.length === 0);
            } catch (error) {
                console.error('Error fetching entity details:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
 
        fetchEntityDetails();
    }, [id]);
 
    const handleDownload = async () => {
        try {
            let downloadApi = "";
            if (downloadType === "CSV") {
                downloadApi = `https://featuremeshapis.azurewebsites.net/api/v1/Values/Download-csv?entityId=${id}`;
            } else if (downloadType === "Excel") {
                downloadApi = `https://featuremeshapis.azurewebsites.net/api/v1/Values/Download-csventityId=${id}`;
            }
            const response = await fetch(downloadApi);
            if (!response.ok) {
                throw new Error('Failed to download file');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `entity_${id}.${downloadType.toLowerCase()}`);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };
 
    const fetchFeatureName = async (featureId: string): Promise<string> => {
        try {
            const response = await fetch(`https://featuremeshapis.azurewebsites.net/api/v1/Feature/${featureId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch feature details');
            }
            const data = await response.json();
            return data.name;
        } catch (error) {
            console.error('Error fetching feature name:', error);
            throw error;
        }
    };
 
    const [featureNames, setFeatureNames] = useState<string[]>([]);
 
    // Call fetchFeatureName for each featureId and store the results in state
    useEffect(() => {
        if (details.feautureIds && details.feautureIds.length > 0) {
            const fetchFeatureNames = async () => {
                const promises = details.feautureIds!.map(featureId => fetchFeatureName(featureId));
                try {
                    const names = await Promise.all(promises);
                    setFeatureNames(names);
                } catch (error) {
                    console.error('Error fetching feature names:', error);
                    // Handle error if needed
                }
            };
 
            fetchFeatureNames();
        }
    }, [details.feautureIds]);
 
    const handleFeatureClick = (featureId: string) => {
        navigate(`/feature-page/${featureId}`);
    };
 
    if (loading) {
        return <div>Loading...</div>;
    }
 
    if (error) {
        return <div>Error fetching entity details</div>;
    }
 
    return (
        <div style={{ margin: "6rem 2rem 2rem 2rem" }}>
            <div className="wrapper">
                <div className="left-container">
                    <div>
                        <h1>{details.name}</h1>
                    </div>
                    <div className="entity-details-list">
                    <table>
                        <tbody>
                            <tr>
                            <td>Id:</td>
                            <td>{details.id}</td>
                            </tr>
                            <tr>
                            <td>Author:</td>
                            <td>{details.author}</td>
                            </tr>
                            <tr>
                            <td>Created At:</td>
                            <td>{details.createdAt}</td>
                            </tr>
                            <tr>
                            <td>Last Updated At:</td>
                            <td>{details.lastUpdatedAt}</td>
                            </tr>
                            <tr>
                            <td>Context:</td>
                            <td>{details.context}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div className="download-container">
                        <select value={downloadType} onChange={(e) => setDownloadType(e.target.value)}>
                            <option value="CSV">CSV</option>
                            <option value="Excel">Excel</option>
                        </select>
                        <button className="download-button" onClick={handleDownload}>Download</button>
                    </div>
                </div>

                <div className="right-container">
                    <div>
                        <h1>Features</h1>
                    </div>
 
                    <div className="features-list">
                        {featureNames.length > 0 ? (
                            <ul>
                                {featureNames.map((name, index) => (
                                    <li key={index} onClick={() => handleFeatureClick(details.feautureIds![index])}>{name}</li>
                                ))}
                            </ul>
                        ) : (
                            <div>No features</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EntityPage;
