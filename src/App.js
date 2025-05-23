import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import ForgotPassword from "./pages/forgotpassword";
import Dashboard from './pages/dashboard';
import BlogsPage from './pages/blogs';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blogs" element={<BlogsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
