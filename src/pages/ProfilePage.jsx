import React from "react";
import { FaUserAlt, FaCrown, FaClock, FaScroll } from "react-icons/fa";
import { GiAncientSword, GiTreasureMap } from "react-icons/gi";

const ProfilePage = ({ user }) => (
  <div
    className="flex justify-center items-center h-screen"
    style={{ marginTop: "20px" }}
  >
    <div
      style={{
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(15px)",
        boxShadow: "0 0 25px rgba(255,215,0,0.2)",
        borderRadius: "20px",
        padding: "40px",
        textAlign: "center",
        color: "white",
        width: "400px",
        margin: "0 auto",
        border: "1px solid rgba(255,215,0,0.2)",
        position: "relative",
      }}
    >
      {/* small ancient icons in the corners */}
      <GiAncientSword
        size={24}
        color="#FFD700"
        style={{ position: "absolute", top: "15px", left: "15px", opacity: 0.8 }}
      />
      <GiTreasureMap
        size={24}
        color="#FFD700"
        style={{ position: "absolute", top: "15px", right: "15px", opacity: 0.8 }}
      />

      {/* Profile Header */}
      <FaCrown size={45} color="#FFD700" style={{ marginBottom: "10px" }} />
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#FFD700",
          letterSpacing: "1px",
          marginBottom: "20px",
          textShadow: "0 0 8px rgba(255,215,0,0.4)",
        }}
      >
        Collector's Profile
      </h2>

      {user ? (
        <div style={{ lineHeight: "1.9", fontSize: "16px" }}>
          <p>
            <FaUserAlt style={{ color: "#FFD700", marginRight: "8px" }} />
            <b>Collector Name:</b> {user.name}
          </p>
          <p>
            <FaScroll style={{ color: "#FFD700", marginRight: "8px" }} />
            <b>Email ID:</b> {user.email}
          </p>
          <p>
            <FaCrown style={{ color: "#FFD700", marginRight: "8px" }} />
            <b>Designation:</b> {user.role || "Ancient Analyst"}
          </p>
          <p>
            <FaClock style={{ color: "#FFD700", marginRight: "8px" }} />
            <b>Joined Vault:</b> {user.joined || "2025"}
          </p>
        </div>
      ) : (
        <p style={{ fontStyle: "italic", opacity: 0.8 }}>
          No collector data found in the archives...
        </p>
      )}
    </div>
  </div>
);

export default ProfilePage;
