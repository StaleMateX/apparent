import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../components/Forms/Login.jsx";
import { HomePageInfo } from "../components/HomePageInfo.jsx";

export function LoginPage({ onLogin }) {
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
    console.log("Response:", response);
    console.log("Data:", data);
    if (response.ok) {
      localStorage.setItem("token", data.access); // Save token for authenticated requests
      localStorage.setItem("username", username);
      onLogin(); // Trigger login state update
      navigate("/Profile"); // Redirect to profile page
    } else {
      alert("Invalid credentials"); // Handle error response
    }
  };

  return (
    <>
      <Login
        username={username}
        password={password}
        onSetUsername={setUsername}
        onSetPassword={setPassword}
        onLogin={handleLogin}
      />
      <HomePageInfo />
    </>
  );
}
