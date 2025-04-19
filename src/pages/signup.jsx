import React, { useState } from "react";
import "./signup.css";
import logo from "../assets/WS.png";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
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

        <h2>Create an Account!</h2>
        <p>Create a new account here.</p>

        <form className="signup-form" onSubmit={handleSignUp}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign Up</button>
        </form>

        <p style={{ marginTop: "10px" }}>
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
}
