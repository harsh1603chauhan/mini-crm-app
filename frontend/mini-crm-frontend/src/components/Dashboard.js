import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          withCredentials: true,
        });
        localStorage.setItem('user', JSON.stringify(res.data));
      } catch (err) {
        console.error('Not logged in:', err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="dashboard-bg d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-5 text-center animate-fade-in rounded-4" style={{ maxWidth: "600px", width: "100%", backgroundColor: "rgba(0,0,0,0.7)" }}>
        <h2 className="mb-3 fw-bold text-white">
          Welcome to <span className="text-warning">Mini CRM</span>
        </h2>
        <p className="lead mb-4 text-light">
          Manage your audience segments and launch powerful campaigns easily.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/segments" className="btn btn-success btn-lg">
            ➕ Create Segment
          </Link>
          <Link to="/campaigns" className="btn btn-warning btn-lg text-dark">
            View Campaigns
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
