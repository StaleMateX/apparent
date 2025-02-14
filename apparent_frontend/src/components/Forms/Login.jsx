import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export function Login({
  username,
  password,
  onSetUsername,
  onSetPassword,
  onLogin,
}) {
  return (
    <div>
      <h1 className="login-h1">Login</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => onSetUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => onSetPassword(e.target.value)}
        />
        <button onClick={onLogin}>Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <a href="../pages/register#/register">Register</a>
      </p>
    </div>
  );
}
