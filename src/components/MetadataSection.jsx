import React from "react";

const MetadataSection = ({ displayData, translations, language, downloadPDF }) => (
  <div
    style={{
      marginTop: "30px",
      background: "#1f213a",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 0 15px rgba(255,215,0,0.3)",
    }}
  >
    <h3 style={{ color: "#FFD700" }}>Coin Metadata</h3>
    {Object.entries(displayData).map(
      ([key, val]) =>
        key !== "image" &&
        key !== "date" &&
        translations[language][key] && (
          <p key={key}>
            <b>{translations[language][key]}:</b> {val}
          </p>
        )
    )}
    <button
      onClick={downloadPDF}
      style={{
        marginTop: "10px",
        padding: "8px 16px",
        background: "#4ecdcc",
        color: "#1c1c2e",
        fontWeight: "bold",
        borderRadius: "8px",
        border: "none",
      }}
    >
      Download PDF
    </button>
  </div>
);

export default MetadataSection;
