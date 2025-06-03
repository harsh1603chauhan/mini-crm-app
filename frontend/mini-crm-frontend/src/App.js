import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Campaigns from "./pages/Campaigns";
import Segments from "./pages/Segments";
import ProtectedRoute from "./components/ProtectedRoute";
import "antd/dist/reset.css";
import "@react-awesome-query-builder/ui/css/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import custom styles for the app
function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: "70px" }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
        <Route path="/segments" element={<ProtectedRoute><Segments /></ProtectedRoute>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
