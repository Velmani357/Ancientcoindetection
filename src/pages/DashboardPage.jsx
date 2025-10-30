import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardPage = ({ history }) => {
  const COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"];

  // 🟡 Metal Data Calculation
  const metalCounts = history.reduce(
    (acc, item) => {
      if (item.metal === "Gold") acc.Gold++;
      else if (item.metal === "Silver") acc.Silver++;
      else if (item.metal === "Bronze") acc.Bronze++;
      return acc;
    },
    { Gold: 0, Silver: 0, Bronze: 0 }
  );

  const metalData = [
    { name: "Gold", value: metalCounts.Gold },
    { name: "Silver", value: metalCounts.Silver },
    { name: "Bronze", value: metalCounts.Bronze },
  ];

  // 🗓️ Year Data Calculation
  const yearCounts = history.reduce((acc, item) => {
    if (!acc[item.year]) acc[item.year] = 0;
    acc[item.year]++;
    return acc;
  }, {});

  const yearData = Object.keys(yearCounts).map((year) => ({
    year,
    coins: yearCounts[year],
  }));

  // fallback values if no data
  const validMetalData = metalData.some((m) => m.value > 0)
    ? metalData
    : [
        { name: "Gold", value: 0 },
        { name: "Silver", value: 0 },
        { name: "Bronze", value: 0 },
      ];

  return (
    <div
      style={{
        background: "#1f213a",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 0 20px rgba(255,215,0,0.3)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#FFD700" }}>Dashboard</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
          justifyContent: "center",
        }}
      >
        {/* Total Coins */}
        <div
          style={{
            background: "linear-gradient(135deg, #ffd70033, #4ecdcc33)",
            padding: "20px",
            borderRadius: "12px",
            width: "250px",
            textAlign: "center",
            border: "2px solid #ffd70055",
            boxShadow: "0 0 10px #ffd70044",
          }}
        >
          <h3>Total Coins</h3>
          <p style={{ fontSize: "28px", fontWeight: "bold", color: "#4ecdcc" }}>
            {history.length}
          </p>
        </div>

        {/* Metal Composition Pie Chart */}
        <div
          style={{
            background: "linear-gradient(135deg, #ffd70033, #4ecdcc33)",
            padding: "20px",
            borderRadius: "12px",
            width: "300px",
            border: "2px solid #ffd70055",
            textAlign: "center",
          }}
        >
          <h3>Metal Composition</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={validMetalData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={4}
                label
              >
                {validMetalData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Yearly Bar Chart */}
        <div
          style={{
            background: "linear-gradient(135deg, #ffd70033, #4ecdcc33)",
            padding: "20px",
            borderRadius: "12px",
            width: "350px",
            border: "2px solid #ffd70055",
            textAlign: "center",
          }}
        >
          <h3>Coins by Year</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={yearData}>
              <XAxis dataKey="year" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="coins" fill="#4ecdcc" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
