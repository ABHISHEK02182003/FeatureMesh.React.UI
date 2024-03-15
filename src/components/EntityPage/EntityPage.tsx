import React from "react";
import "./EntityPage.css"; // Import the CSS file

// Define the shape of the entity details prop
interface EntityDetails {
	id: string;
	author: string;
	createdAt: string;
	lastUpdatedAt: string;
	context: string;
}

// Define the props for the EntityPage component
interface EntityPageProps {
	entityDetails?: EntityDetails;
}

// Define the EntityPage component
export const EntityPage: React.FC<EntityPageProps> = ({ entityDetails }) => {
	// Default values if no props are provided
	const defaultDetails: EntityDetails = {
		id: "N/A",
		author: "N/A",
		createdAt: "N/A",
		lastUpdatedAt: "N/A",
		context: "N/A",
	};

	console.log(entityDetails);

	// Merge default values with provided props
	const details = { ...defaultDetails, ...entityDetails };

	return (
		<div style={{ margin: "6rem 2rem 2rem 2rem" }}>
			<div className="wrapper">
				<div className="left-container">
					<div>
						<h1>EntityName</h1>
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
						<ul>
							<li>
								<input
									type="checkbox"
									id="testScoreCheckbox"
									className="custom-checkbox"
								/>
								<label htmlFor="testScoreCheckbox" className="custom-label">
									Test Score
								</label>
							</li>
							<li>
								<input
									type="checkbox"
									id="attendanceCheckbox"
									className="custom-checkbox"
								/>
								<label htmlFor="attendanceCheckbox" className="custom-label">
									Attendance
								</label>
							</li>
							<li>
								<input
									type="checkbox"
									id="contactInfoCheckbox"
									className="custom-checkbox"
								/>
								<label htmlFor="contactInfoCheckbox" className="custom-label">
									Contact Info
								</label>
							</li>
							<li>
								<input
									type="checkbox"
									id="behaviourCheckbox"
									className="custom-checkbox"
								/>
								<label htmlFor="behaviourCheckbox" className="custom-label">
									Behaviour
								</label>
							</li>
							<li>
								<input
									type="checkbox"
									id="gradePointsCheckbox"
									className="custom-checkbox"
								/>
								<label htmlFor="gradePointsCheckbox" className="custom-label">
									Grade Points
								</label>
							</li>
							<li>
								<input
									type="checkbox"
									id="departmentCheckbox"
									className="custom-checkbox"
								/>
								<label htmlFor="departmentCheckbox" className="custom-label">
									Department
								</label>
							</li>
							<li>
								<input
									type="checkbox"
									id="extraCurricularScoreCheckbox"
									className="custom-checkbox"
								/>
								<label
									htmlFor="extraCurricularScoreCheckbox"
									className="custom-label"
								>
									Extra Curricular Score
								</label>
							</li>
						</ul>
					</div>
					<div className="download-option">
						<div className="input">
							<select className="file-format-select">
								<option value="csv">CSV</option>
								<option value="excel">Excel</option>
							</select>
							<button className="download-button">Download</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
