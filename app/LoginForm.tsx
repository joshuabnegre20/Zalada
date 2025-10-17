import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !password) {
      setMessage("⚠️ Please enter both username and password.");
      return;
    }

    // Example validation logic
    if (username === "admin" && password === "1234") {
      setMessage("✅ Login successful!");
    } else {
      setMessage("❌ Invalid username or password.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          width: "320px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Login Form
        </h2>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="username" style={{ display: "block", marginBottom: "0.5rem" }}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            placeholder="Enter username"
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem" }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            backgroundColor: "#3b82f6",
            color: "#fff",
            padding: "0.6rem",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login
        </button>

        {message && (
          <p style={{ textAlign: "center", marginTop: "1rem", color: "#555" }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
