import React from "react";

const HistoryPanel = ({ history, setFetchedData }) => (
  <div
    style={{
      flex: "1 1 300px",
      background: "#1f213a",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 0 10px rgba(255, 215, 0, 0.2)",
    }}
  >
    <h2 style={{ color: "#FFD700" }}>History</h2>
    {history.length === 0 ? (
      <p>No coins analyzed yet.</p>
    ) : (
      history.map((item, idx) => (
        <div
          key={idx}
          onClick={() => setFetchedData(item)}
          style={{
            background: "#262849",
            padding: "10px",
            marginBottom: "8px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src={item.image}
            alt="coin"
            style={{ width: "45px", height: "45px", borderRadius: "6px" }}
          />
          <div>
            <p style={{ fontWeight: "bold" }}>{item.coin_id}</p>
            <p style={{ fontSize: "12px", color: "#aaa" }}>{item.date}</p>
          </div>
        </div>
      ))
    )}
  </div>
);

export default HistoryPanel;
