import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./FeaturePublish.css";

const FeaturePublish: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedOption === "upload" && selectedFile) {
      const formData = new FormData();
      formData.append("files", selectedFile);
      
      try {
        const response = await fetch("https://featuremeshapis.azurewebsites.net/api/v1/files/uploadfilestostorage", {
          method: "POST",
          body: formData
        });

        if (response.ok) {
            console.log('Entity published successfully');
          toast.success("File uploaded successfully!");
        } else {
          toast.error("Error uploading file");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error uploading file");
      }
    } else {
      // Handle entries functionality
      toast.success("Enter feature details");
    }
  };

  return (
    <div style={{ margin: "6rem 2rem 2rem 2rem" }}>
      <div className="form-container">
        <div className="form-heading">
          <h1>Enter the Feature Details {selectedOption && <>using {selectedOption}</>}</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="option-container">
            <input
              type="radio"
              id="entries"
              name="option"
              value="entries"
              checked={selectedOption === "entries"}
              onChange={() => handleOptionChange("entries")}
            />
            <label className="label" htmlFor="entries">Entries</label>
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
            <div>
              <input 
                type="file" 
                id="fileInput" 
                className="file-input" 
                accept=".xlsx" 
                onChange={handleFileChange} 
              />
            </div>
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

export default FeaturePublish;
