import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ValuePublish.css";
import { useMsal } from "@azure/msal-react";
 
const ValuePublish: React.FC = () => {
  const { accounts } = useMsal();
  const account = accounts[0];

  const username = account ? account.username : "Unknown";
  const fname = username.split(".")[0];

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ownerName, setOwnerName] = useState<string>("");
  const [entityName, setEntityName] = useState<string>("");
 
  const handleOptionChange = (option: string) => {
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
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedOption === "upload" && selectedFile) {
      const formData = new FormData();
      formData.append("files", selectedFile);
      formData.append("ScientistName", ownerName); // Add owner name to form data
      formData.append("EntityName", entityName); // Add entity name to form data
     
      try {
        const response = await fetch("https://featuremeshapis.azurewebsites.net/api/v1/files/uploadfilestostorage", {
          method: "POST",
          body: formData
        });
 
        if (response.ok) {
          console.log('File uploaded successfully');
          toast.success("File uploaded successfully!");
        } else {
          toast.error("Error uploading file");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error uploading file");
      }
    } else {
      // Handle manual entry functionality
      toast.success("Enter feature details");
    }
  };
 
  return (
    <div style={{ margin: "6rem 2rem 2rem 2rem" }}>
      <div className="form-container">
        <div className="form-heading">
          <h1>Enter the Feature Value Details {selectedOption && <>using {selectedOption}</>}</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="option-container">
            <input
              type="radio"
              id="manualEntry"
              name="option"
              value="manual entry"
              checked={selectedOption === "manual entry"}
              onChange={() => handleOptionChange("manual entry")}
            />
            <label className="label" htmlFor="manualEntry">Manual Entry</label>
            <input
              type="radio"
              id="upload"
              name="option"
              value="upload"
              checked={selectedOption === "upload"}
              onChange={() => handleOptionChange("upload")}
            />
            <label className="label" htmlFor="upload">Upload</label>
          </div>
          {selectedOption === "upload" && (
            <>
              <div>
                <label htmlFor="ownerName">Enter owner name:  </label>
                <input
                  type="text"
                  id="ownerName"
                  placeholder="Owner Name"
                  value={fname}
                  onChange={handleOwnerNameChange}
                  disabled
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
            {selectedOption === "upload" && <button type="submit">Submit</button>}
          </div>
        </form>
        {selectedOption === "upload" && (
          <div className="template-download-container">
            <button>Download Template</button>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default ValuePublish;