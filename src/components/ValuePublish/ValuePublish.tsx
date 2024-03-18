import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ValuePublish.css";
import { useMsal } from "@azure/msal-react";
 
const ValuePublish: React.FC = () => {
  const { accounts } = useMsal();
  const account = accounts[0];
 
  const username = account ? account.username : "Unknown";
  const fname = username.split(".")[0];
 
  const [selectedOption, setSelectedOption] = useState<"manual entry" | "upload">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ownerName, setOwnerName] = useState<string>(fname);
  const [entityName, setEntityName] = useState<string>("");
  const [featureNames, setFeatureNames] = useState<string[]>([]);
  const [formData, setFormData] = useState<Array<{ [key: string]: string }>>([{}]);
  const [numRows, setNumRows] = useState(3); // Initialize with 3 rows
 
 
  const handleOptionChange = (option: "manual entry" | "upload") => {
    setSelectedOption(option);
  };
 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
 
  const handleOwnerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerName(e.target.value);
  };
 
  const handleEntityNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntityName(e.target.value);
  };
 
  const handleAddRow = () => {
    setNumRows(numRows + 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const jsonData = {
      scientistName: ownerName,
      entityName: entityName,
      features: featureNames.map((featureName, index) => ({
        featureName: featureName,
        data: formData.map((row, rowIndex) => ({
          featureIdentifier: `employee${rowIndex + 1}`,
          featureValue: row[featureName] || '' 
        }))
      }))
    };
  };
 
 
 
  const handleFetchFeatures = async () => {
    try {
      const featureResponse = await fetch(`https://featuremeshapis.azurewebsites.net/api/v1/Feature/ByName?scientistName=${ownerName}&entityName=${entityName}`);
      if (!featureResponse.ok) {
        throw new Error("Failed to fetch feature names");
      }
 
      const featureData = await featureResponse.json();
      featureData.unshift("Feature Identifier");
      setFeatureNames(featureData); // Assuming featureData is an array of feature names directly
    } catch (error) {
      console.error('Error fetching features list:', error);
      toast.error("Failed to fetch feature names");
    }
  };  
 
  const handleInputChange = (index: number, featureName: string, value: string) => {
    const updatedFormData = [...formData];
    updatedFormData[index][featureName] = value;
    setFormData(updatedFormData);
  };

  function publishClicked() {
    window.open("https://calm-dune-021c01500.5.azurestaticapps.net/","_self");
  }
 
  return (
    <div style={{ margin: "6rem 2rem 2rem 2rem" }}>
      <div className="form-container">
        <div className="form-heading">
          <h1>Enter the Feature Value Details {selectedOption && <>using {selectedOption}</>}</h1>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="toggle-button-container">
            <button
              className={`toggle-button ${selectedOption === "upload" ? "active" : ""}`}
              onClick={() => handleOptionChange("upload")}
            >
              Upload
            </button>
            <button
              className={`toggle-button ${selectedOption === "manual entry" ? "active" : ""}`}
              onClick={() => handleOptionChange("manual entry")}
            >
              Manual Entry
            </button>
          </div>
          {selectedOption === "upload" && (
            <>
              <div>
                <label htmlFor="ownerName">Enter owner name:  </label>
                <input
                  type="text"
                  id="ownerName"
                  placeholder="Owner Name"
                  value={ownerName}
                  onChange={handleOwnerNameChange}
                />
              </div>
              <div>
                <label htmlFor="entityName">Enter entity name:  </label>
                <input
                  type="text"
                  id="entityName"
                  placeholder="Entity Name"
                  value={entityName}
                  onChange={handleEntityNameChange}
                />
              </div>
              <div>
                <input
                  type="file"
                  id="fileInput"
                  className="file-input"
                  accept=".xlsx"
                  onChange={handleFileChange}
                />
              </div>
            </>
          )}
          <div className="button-container">
            {selectedOption === "upload" && <button onClick={publishClicked} type="submit">Submit</button>}
          </div>
        </form>
        {selectedOption === "upload" && (
          <div className="template-download-container">
            <button>Download Template</button>
          </div>
        )}
        {selectedOption === "manual entry" && (
          <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="ownerName">Enter Owner Name:</label>
            <input
              type="text"
              id="ownerName"
              placeholder="Owner Name"
              value={ownerName}
              onChange={handleOwnerNameChange}
            />
          </div>
          <div>
            <label htmlFor="entityName">Enter Entity Name:</label>
            <input
              type="text"
              id="entityName"
              placeholder="Entity Name"
              value={entityName}
              onChange={handleEntityNameChange}
            />
          </div>
          <div className="fetch-features-container"> {/* added container class */}
            <button className="fetch-features" type="button" onClick={handleFetchFeatures}>Fetch Features</button>
          </div>
          <div className="feature-grid">
            <table>
              <thead>
                <tr>
                  {featureNames.map((featureName, index) => (
                  <th key={index}>{featureName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(numRows)].map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {featureNames.map((featureName, index) => (
                      <td key={index}>
                        <input type="text" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="fetch-features" type="button" onClick={handleAddRow}>Add More Rows</button>
          <div className="button-container">
            <button type="submit">Submit</button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};
 
export default ValuePublish;
