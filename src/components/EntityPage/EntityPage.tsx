import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import "./EntityPage.css"; // Import the CSS file

// Define the shape of the entity details prop
interface EntityDetails {
	id: string;
	name: string
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
						<ul>
							<li>Id: {details.id}</li>
							<li>Author: {details.author}</li>
							<li>Created At: {details.createdAt}</li>
							<li>Last Updated At: {details.lastUpdatedAt}</li>
							<li>Context: {details.context}</li>
						</ul>
					</div>
				</div>
				<div className="right-container">
					<div>
						<h1>Features</h1>
					</div>

					<div className="features-list">
						{details.feautureIds && details.feautureIds.length > 0 ? (
							<ul>
								{details.feautureIds.map((featureId, index) => (
									<li key={index}>
										<input
											type="checkbox"
											id={`featureCheckbox-${index}`}
											className="custom-checkbox"
											value={featureId}
										/>
										<label htmlFor={`featureCheckbox-${index}`} className="custom-label">
											{featureId}
										</label>
									</li>
								))}
							</ul>
						) : (
							<div>No features</div>
						)}
					</div>
					<div className="download-option">
						<div className="input">
							<select className="file-format-select">
								<option value="csv">CSV</option>
								<option value="excel">Excel</option>
							</select>
							<button className="download-button" disabled={disableDownload}>
								Download
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
