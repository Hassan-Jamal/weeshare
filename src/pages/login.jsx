import React from "react";
import "./signup.css";
import logo from "../assets/WS.png";

export default function Login() {
  return (
    <div className="signup-container">
      <div className="gradient-bg gradient-bg-top"></div>
      <div className="gradient-bg gradient-bg-bottom"></div>

      <div className="signup-content">
      <div className="logo">
            <img src={logo} alt="WeeShare Logo" className="logo-image" />
          </div>

        <h2>Welcome Back, <span role="img" aria-label="waving hand">👋</span></h2>
        <p>Sign in to your dashboard & start <br></br>tracking your analytics.</p>

        <form className="signup-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Example@email.com"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            required
          />

          <div className="forgot-password" style={{ textAlign: 'right', marginBottom: '1rem' }}>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}
