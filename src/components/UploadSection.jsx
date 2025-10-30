import React from "react";
import { FaUpload } from "react-icons/fa";

const UploadSection = ({
  uploadedFile,
  setUploadedFile,
  handleAnalyze,
  language,
  handleLanguageChange,
}) => (
  <div
    style={{
      flex: "1 1 400px",
      background: "#1f213a",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
      border: "2px dashed #4ecdcc",
      boxShadow: "0 0 15px rgba(78,205,204,0.4)",
    }}
  >
    <h2 style={{ color: "#FFD700" }}>
      <FaUpload /> Upload or Drag & Drop Coin Image
    </h2>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setUploadedFile(e.target.files[0])}
      style={{ marginTop: "15px" }}
    />

    <div style={{ marginTop: "15px" }}>
      <label>Language:</label>
      <select
        value={language}
        onChange={handleLanguageChange}
        style={{ marginLeft: "10px" }}
      >
        <option value="en">English</option>
        <option value="ta">தமிழ்</option>
      </select>
    </div>

    {uploadedFile && (
      <div style={{ marginTop: "15px" }}>
        <img
          src={URL.createObjectURL(uploadedFile)}
          alt="Coin"
          style={{
            width: "160px",
            height: "160px",
            objectFit: "cover",
            borderRadius: "50%",
            border: "3px solid #ffd700",
          }}
        />
        <button
          onClick={handleAnalyze}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            borderRadius: "10px",
            background: "linear-gradient(45deg, #ffd700, #4ecdcc)",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Analyze Coin
        </button>
      </div>
    )}
  </div>
);

export default UploadSection;
