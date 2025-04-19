import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./signup.css";
import logo from "../assets/WS.png";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials: " + error.message);
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

        <h2>
          Welcome Back, <span role="img" aria-label="waving hand">👋</span>
        </h2>
        <p>Sign in to your dashboard & start <br />tracking your analytics.</p>

        <form className="signup-form" onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <div className="forgot-password" style={{ textAlign: 'right', marginBottom: '1rem' }}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit">Sign in</button>
        </form>

        <p>Don’t have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
}
