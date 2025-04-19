import React, { useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import "./signup.css";
import logo from "../assets/WS.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="gradient-bg gradient-bg-top"></div>
      <div className="gradient-bg gradient-bg-bottom"></div>

      <div className="signup-content">
        <div className="logo">
          <img src={logo} alt="WeeShare Logo" className="logo-image" />
        </div>

        <h2>Forgot Password?</h2>
        <p>Enter your email to receive a reset link.</p>

        <form className="signup-form" onSubmit={handleReset}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
}
