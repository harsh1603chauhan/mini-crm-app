import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; // for custom styles

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow-sm">
    <div className="container">
      <NavLink className="navbar-brand fw-bold fs-4" to="/">Mini CRM</NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto gap-2">
          <li className="nav-item">
            <NavLink className="nav-link nav-link-custom" to="/">Dashboard</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link nav-link-custom" to="/segments">Segments</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link nav-link-custom" to="/campaigns">Campaigns</NavLink>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-link-custom" href="http://localhost:5000/api/auth/logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
