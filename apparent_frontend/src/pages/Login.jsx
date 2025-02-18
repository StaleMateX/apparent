import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }), // Ensure username and password are sent
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.access); // Save token for authenticated requests
      onLogin(); // Trigger login state update
      navigate("/Profile"); // Redirect to home
    } else {
      alert("Invalid credentials"); // Handle error response
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register#/register">Register</a>
      </p>
    </div>
  );
}
