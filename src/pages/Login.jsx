import React from "react";

const Login = ({ email, setEmail, password, setPassword, handleLogin }) => {
  return (
    <div
      style={{
        backgroundImage: "url('/background.png')", // ✅ Public background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* ✅ CSS animation defined here */}
      <style>
        {`
          @keyframes rotateCoin {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
          }
        `}
      </style>

      <div
        style={{
          background: "rgba(255, 255, 255, 0.12)",
          padding: "40px",
          borderRadius: "16px",
          width: "400px",
          textAlign: "center",
          boxShadow: "0 0 30px rgba(255,215,0,0.2)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* ✅ Rotating coin */}
        <img
          src="login.png"
          alt="Login Visual"
          style={{
            width: "120px",
            marginBottom: "20px",
            borderRadius: "50%",
            border: "3px solid #ffd700",
            animation: "rotateCoin 4s linear infinite", // ✅ fixed rotation
            transformStyle: "preserve-3d",
          }}
        />

        <h2 style={{ color: "#ffd700", marginBottom: "20px" }}>
          Vault of Time Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "none",
            outline: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "none",
            outline: "none",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            background: "linear-gradient(45deg, #ffd700, #4ecdcc)",
            color: "#1b1c34",
            marginBottom: "20px",
            borderRadius: "6px",
            fontWeight: "bold",
            border: "none",
            //borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.target.style.background =
              "linear-gradient(45deg, #4ecdcc, #ffd700)")
          }
          onMouseOut={(e) =>
            (e.target.style.background =
              "linear-gradient(45deg, #ffd700, #4ecdcc)")
          }
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
