import React, { useState } from "react";
import "./Login.css";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: send something to backend
        console.log("Login submitted", { email, password });
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}