import { toast } from "react-toastify";
 
import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import "./FeaturePublish.css";
 
import "react-toastify/dist/ReactToastify.css";
 
interface FormState {
    featureName: string;
    dataType: string;
    entityId: string;
    description: string;
}
 
export const FeaturePublish: React.FC = () => {
 
    const [formState, setFormState] = useState<FormState>({
        featureName: "",
        dataType:"",
        entityId: "",
        description: ""
    });
 
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target as HTMLInputElement & HTMLTextAreaElement;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };
 
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
 
        const { featureName, description, dataType } = formState;
 
        const jsonObject = {
            Name: featureName,
            Description: description,
            DataType: dataType
        };
 
        console.log(jsonObject);
 
        try {
            const response = await fetch(
              `https://featuremeshapis.azurewebsites.net/api/v1/feature/${formState.entityId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(jsonObject),
                }
            );
 
            if (response.ok) {
                console.log("Entity published successfully");
                toast.success("Entity published successfully");
                setFormState({
                    entityId: "",
                    featureName: "",
                    dataType: "",
                    description: "",
                });
            } else {
                console.error("Failed to publish entity:", response.statusText);
                toast.error("Failed to publish entity");
            }
        } catch (error) {
            console.error("Error publishing entity:", error);
            toast.error("Error publishing entity");
        }
    };
 
    return (
        <div style={{ margin: "6rem 2rem 2rem 2rem" }}>
            <div className="form-container">
                <div className="form-heading">
                    <h1>Enter the Feature Details</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Entity Id:</span>
                        <input
                            type="text"
                            name="entityId"
                            placeholder="Enter the Entity Id"
                            value={formState.entityId}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <span>Feature Name:</span>
                        <input
                            type="text"
                            name="featureName"
                            placeholder="Enter the Feature Name"
                            value={formState.featureName}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <span>Feature DataType:</span>
                        <input
                            type="text"
                            name="dataType"
                            placeholder="Enter the Feature data type"
                            value={formState.dataType}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <span>Feature Description:</span>
                        <input
                            type="text"
                            name="description"
                            placeholder="Enter the Feature Description"
                            value={formState.description}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Publish</button>
                </form>
            </div>
        </div>
    );
};