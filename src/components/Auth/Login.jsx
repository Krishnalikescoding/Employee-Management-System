import React, { useState } from "react";
import "../../css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const SubmitHandeler = (e) => {
    e.preventDefault();
    handleLogin(email, password)
    console.log("Email is", email);
    console.log("Password is", password);

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome back</h2>
          <p>Sign in to your account</p>
        </div>

        <form
          required
          onSubmit={(e) => {
            SubmitHandeler(e);
          }}
          className="login-form"
        >
          <div className="input-group">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div className="forgot">
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">Log in</button>
        </form>

        <p className="signup-text">
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
