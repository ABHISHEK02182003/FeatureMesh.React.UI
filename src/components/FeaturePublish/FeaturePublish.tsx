import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import styles from './FeaturePublish.module.css';

interface Entity {
    id: string;
    name: string;
}

interface FormState {
    entityId: string;
    Name: string;
    dataType: string;
    description: string;
}

export const FeaturePublish: React.FC = () => {
    const [formState, setFormState] = useState<FormState>({
        entityId: "",
        Name: "",
        dataType: "",
        description: ""
    });
    const [entityIdSet, setEntityIdSet] = useState(false);
    const [tableData, setTableData] = useState<FormState[]>([]);
    const [entityNames, setEntityNames] = useState<Entity[]>([]);

    useEffect(() => {
        const fetchEntityNames = async () => {
            try {
                const response = await fetch("https://featuremeshapis.azurewebsites.net/api/v1/entity");
                if (!response.ok) {
                    throw new Error('Failed to fetch entity names');
                }
                const data = await response.json();
                setEntityNames(data);
            } catch (error) {
                console.error('Error fetching entity names:', error);
                toast.error('Error fetching entity names');
            }
        };

        fetchEntityNames();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target as HTMLInputElement & HTMLTextAreaElement;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSetEntityId = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formState.entityId) {
            toast.error("Please enter the Entity Id");
            return;
        }
        setEntityIdSet(true);
    };

    const handleEntityNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEntityId = e.target.value;
        const selectedEntity = entityNames.find(entity => entity.id === selectedEntityId);
        if (selectedEntity) {
            setFormState((prevState) => ({ ...prevState, entityId: selectedEntity.id }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { Name, dataType, description } = formState;

        // Check if any field is empty
        if (!Name || !dataType || !description) {
            toast.error("All fields are required");
            return;
        }

        setTableData((prevState) => [...prevState, formState]);
        setFormState({
            entityId: formState.entityId, // Keep the entityId unchanged
            Name: "",
            dataType: "",
            description: ""
        });
    };

    const handleDelete = (index: number) => {
        setTableData((prevState) => prevState.filter((_, i) => i !== index));
    };

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    const handleFinalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            for (const obj of tableData) {
                await postData(`https://featuremeshapis.azurewebsites.net/api/v1/feature/${formState.entityId}`, obj);
            }
            toast.success('Features Added Successfully');
            setTableData([]);
        }
        catch (error) {
            toast.error('Server Error');
        }
    }

    return (
        <div className={styles.parent_container} style={{ margin: "6rem 1rem 1rem 2rem" }}>
            {!entityIdSet && (
                <div className={styles.form_container}>
                    <div className={styles.form_heading}>
                        <h1>Select Entity Name</h1>
                    </div>
                    <form className={styles.form} onSubmit={handleSetEntityId}>
                        <label>
                            <span>Entity Name:</span>
                            <select
                                name="entityId"
                                value={formState.entityId}
                                onChange={handleEntityNameChange}
                                required
                            >
                                <option value="">Select Entity Name</option>
                                {entityNames.map(entity => (
                                    <option key={entity.id} value={entity.id}>{entity.name}</option>
                                ))}
                            </select>
                        </label>
                        <button type="submit">Set</button>
                    </form>
                </div>
            )}

            {entityIdSet && (
                <div className={styles.form_container}>
                    <div className={styles.form_heading}>
                        <h1>Enter the Feature Details</h1>
                    </div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label>
                            <span>Feature Name:</span>
                            <input
                                type="text"
                                name="Name"
                                placeholder="Enter the Feature Name"
                                value={formState.Name}
                                onChange={handleChange}
                                required
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
                                required
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
                                required
                            />
                        </label>
                        <button type="submit">Add</button>
                    </form>
                </div>
            )}

            {entityIdSet && (
                <div className={styles.table_container}>
                    <p className={styles.entityId}>Entity ID: {formState.entityId}</p>
                    <table >
                        <thead>
                            <tr>
                                <th>Feature Name</th>
                                <th>Data Type</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className={styles.table_body_css}>
                            {tableData.map((rowData, index) => (
                                <tr key={index}>
                                    <td>{rowData.Name}</td>
                                    <td>{rowData.dataType}</td>
                                    <td>{rowData.description}</td>
                                    <td>
                                        <button onClick={() => handleDelete(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {tableData.length > 0 && (
                        <form className={styles.form} onSubmit={handleFinalSubmit}>
                            <button type="submit">Submit</button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default FeaturePublish;
