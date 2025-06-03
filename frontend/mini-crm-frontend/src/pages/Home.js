import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="container mt-5">
    <div className="jumbotron bg-light p-5 rounded shadow">
      <h1 className="display-4 text-primary">Welcome to Mini CRM</h1>
      <p className="lead">Manage your customers, audience segments, and marketing campaigns—all in one place.</p>
      <hr className="my-4" />
      <p>
        <Link to="/segments" className="btn btn-success btn-lg mr-3">Manage Segments</Link>
        <Link to="/campaigns" className="btn btn-info btn-lg">View Campaigns</Link>
      </p>
    </div>
  </div>
);

export default Home;