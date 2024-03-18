import { toast } from "react-toastify";
 
import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import "./EntityPublish.css";
 
import "react-toastify/dist/ReactToastify.css";
 
interface FormState {
    ownerName: string;
    entityName: string;
    entityId: string;
    entityDescription: string;
}
 
export const EntityPublishPage: React.FC = () => {
    const { accounts } = useMsal();
    const account = accounts[0];
 
    const username = account ? account.username : "Unknown";
    const fname = username.split(".")[0];
 
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
 
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
 
        const { ownerName, entityId, entityName, entityDescription } = formState;
 
        const jsonObject = {
            ScientistName: fname,
            EntityId: entityId,
            EntityName: entityName,
            EntityDescription: entityDescription,
        };
 
        console.log(jsonObject);
 
        try {
            const response = await fetch(
                "https://featuremeshapis.azurewebsites.net/api/v1/scientist",
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
                    ownerName: "",
                    entityName: "",
                    entityId: "",
                    entityDescription: "",
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
                    <h1>Enter the Entity Details</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Owner Name:</span>
                        <input
                            type="text"
                            name="ownerName"
                            placeholder={fname}
                            value={fname}
                            onChange={handleChange}
                            disabled
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
 