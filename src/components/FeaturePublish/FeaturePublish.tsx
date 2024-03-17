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
    const [tableData, setTableData] = useState<FormState[]>([]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target as HTMLInputElement & HTMLTextAreaElement;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { entityId, featureName, dataType, description } = formState;

        // Check if any field is empty
        if (!entityId || !featureName || !dataType || !description) {
            toast.error("All fields are required");
            return;
        }

        setTableData((prevState) => [...prevState, formState]);
        setFormState({
            entityId: "",
            featureName: "",
            dataType: "",
            description: ""
        });
    };

    const handleDelete = (index: number) => {
        setTableData((prevState) => prevState.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.parent_container}>
            <div className={styles.form_container}>
                <div className={styles.form_heading}>
                    <h1>Enter the Feature Details</h1>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
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

            <div className={styles.table_container}>
                <table >
                    <thead>
                        <tr>
                            <th>Entity Id</th>
                            <th>Feature Name</th>
                            <th>Data Type</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <div>
                        <tbody className={styles.table_body_css}>
                            {tableData.map((rowData, index) => (
                                <tr key={index}>
                                    <td>{rowData.entityId}</td>
                                    <td>{rowData.featureName}</td>
                                    <td>{rowData.dataType}</td>
                                    <td>{rowData.description}</td>
                                    <td>
                                        <button onClick={() => handleDelete(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </div>
                </table>
            </div>
        </div>
    );
};
