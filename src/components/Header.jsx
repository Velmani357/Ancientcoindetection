import React from "react";
import { FaHome, FaTachometerAlt, FaUser, FaSignOutAlt } from "react-icons/fa";

const Header = ({ user, handleNavClick, setLoggedIn }) => {
  const logout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
  };

  return (
    <header
      style={{
        background: "linear-gradient(90deg, #1b1c34, #23264d)",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        boxShadow: "0 0 10px rgba(255,215,0,0.3)",
      }}
    >
      <h2 style={{ color: "#FFD700", margin: 0 }}>Vault of Time</h2>
      <nav style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <button
          onClick={() => handleNavClick("home")}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          <FaHome /> Home
        </button>
        <button
          onClick={() => handleNavClick("dashboard")}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          <FaTachometerAlt /> Dashboard
        </button>
        <button
          onClick={() => handleNavClick("profile")}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          <FaUser /> Profile
        </button>
        <button
          onClick={logout}
          style={{
            background: "#FFD700",
            color: "#1b1c34",
            padding: "8px 14px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
