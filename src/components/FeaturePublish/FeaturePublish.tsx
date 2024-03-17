import { toast } from "react-toastify";
import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import "react-toastify/dist/ReactToastify.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import styles from './FeaturePublish.module.css';

interface FormState {
    entityId: string;
    featureName: string;
    dataType: string;
    description: string;
}

export const FeaturePublish: React.FC = () => {
    const [formState, setFormState] = useState<FormState>({
        entityId: "",
        featureName: "",
        dataType: "",
        description: ""
    });
    const [entityIdSet, setEntityIdSet] = useState(false);
    const [tableData, setTableData] = useState<FormState[]>([]);

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { featureName, dataType, description } = formState;

        // Check if any field is empty
        if (!featureName || !dataType || !description) {
            toast.error("All fields are required");
            return;
        }

        setTableData((prevState) => [...prevState, formState]);
        setFormState({
            entityId: formState.entityId, // Keep the entityId unchanged
            featureName: "",
            dataType: "",
            description: ""
        });
    };

    const handleDelete = (index: number) => {
        setTableData((prevState) => prevState.filter((_, i) => i !== index));
    };

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    const handleFinalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        for (const obj of tableData) {
            try {
                console.log(obj);
                const response = await postData('https://featuremeshapis.azurewebsites.net/api/v1/feature', obj);
                toast.success('Features Added Successfully');
            }
            catch (error) {
                toast.error('Server Error');
            }
        }
    }

    return (
        <div className={styles.parent_container}>
            {!entityIdSet && (
                <div className={styles.form_container}>
                    <div className={styles.form_heading}>
                        <h1>Set Entity Id</h1>
                    </div>
                    <form className={styles.form} onSubmit={handleSetEntityId}>
                        <label>
                            <span>Entity Id:</span>
                            <input
                                type="text"
                                name="entityId"
                                placeholder="Enter the Entity Id"
                                value={formState.entityId}
                                onChange={handleChange}
                                required
                            />
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
                                name="featureName"
                                placeholder="Enter the Feature Name"
                                value={formState.featureName}
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
                                    <td>{rowData.featureName}</td>
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

