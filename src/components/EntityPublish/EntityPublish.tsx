import React, { useState } from "react";
import "./EntityPublish.css";

interface FormState {
	ownerName: string;
	entityName: string;
	entityId: string;
	entityDescription: string;
}

export const EntityPublishPage: React.FC = () => {
	const [formState, setFormState] = useState<FormState>({
		ownerName: "",
		entityName: "",
		entityId: "",
		entityDescription: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target as HTMLInputElement & HTMLTextAreaElement;
		setFormState((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formState);
	};

	return (
		<div style={{ margin: "6rem 2rem 2rem 2rem" }}>
			<div className="form-container">
				<div className="form-heading">
					<h1>Enter the Entity Details</h1>
				</div>
				<form onSubmit={handleSubmit}>
					<label>
						<span>Owner Name:</span>
						<input
							type="text"
							name="ownerName"
							placeholder="John Doe"
							value={formState.ownerName}
							onChange={handleChange}
						/>
					</label>
					<label>
						<span>Entity Name:</span>
						<input
							type="text"
							name="entityName"
							placeholder="Enter the Entity Name"
							value={formState.entityName}
							onChange={handleChange}
						/>
					</label>
					<label>
						<span>Entity Id:</span>
						<input
							type="text"
							name="entityId"
							placeholder="Enter the Entity ID"
							value={formState.entityId}
							onChange={handleChange}
						/>
					</label>
					<label>
						<span>Entity Description:</span>
						<input
							name="entityDescription"
							placeholder="Enter the Entity Description"
							value={formState.entityDescription}
							onChange={handleChange}
						/>
					</label>
					<button type="submit">Publish</button>
				</form>
			</div>
		</div>
	);
};
