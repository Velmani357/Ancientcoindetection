import React from "react";

const FeaturesSection = ({ features }) => (
  <div
    style={{
      marginTop: "40px",
      background: "#1f213a",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 0 20px rgba(255,215,0,0.2)",
    }}
  >
    <h2 style={{ color: "#FFD700", textAlign: "center", marginBottom: "20px" }}>
      ⚙️ Key Features
    </h2>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
      }}
    >
      {features.map((f, idx) => (
        <div
          key={idx}
          style={{
            background: "linear-gradient(135deg, #23264d, #1a1b35)",
            padding: "20px",
            borderRadius: "15px",
            textAlign: "center",
            transition: "all 0.3s ease",
            boxShadow: "0 0 10px rgba(255,215,0,0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.boxShadow = "0 0 25px #FFD70088";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 0 10px rgba(255,215,0,0.2)";
          }}
        >
          <div style={{ fontSize: "40px", color: "#FFD700" }}>{f.icon}</div>
          <h3 style={{ marginTop: "10px", color: "#4ecdcc" }}>{f.title}</h3>
          <p style={{ fontSize: "14px", color: "#aaa" }}>{f.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FeaturesSection;
