import React from "react";
import "./signup.css";
import logo from "../assets/WS.png";

export default function SignUp() {
  return (
    <div className="signup-container">
      <div className="gradient-bg gradient-bg-top"></div>
      <div className="gradient-bg gradient-bg-bottom"></div>

      <div className="signup-content">
        <div className="logo">
          <div className="logo">
            <img src={logo} alt="WeeShare Logo" className="logo-image" />
          </div>
        </div>

        <h2>Create an Account!</h2>
        <p>Create a new account here.</p>

        <form className="signup-form">
        <label htmlFor="email">Email</label>
          <input type="email" placeholder="Example@email.com" required />
          <label htmlFor="email">Password</label>
          <input type="password" placeholder="At least 8 characters" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
