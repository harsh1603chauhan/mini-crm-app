import React, { useEffect, useState } from "react";
import API from "../services/api";

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    API.get("/campaigns")
      .then(res => setCampaigns(res.data))
      .catch(err => console.error("Failed to fetch campaigns:", err));
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h4 className="mb-3">Campaign History</h4>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Audience Size</th>
                <th>Sent</th>
                <th>Failed</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">No campaigns found.</td>
                </tr>
              ) : (
                campaigns.map(c => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.stats?.audienceSize ?? 0}</td>
                    <td>{c.stats?.sent ?? 0}</td>
                    <td>{c.stats?.failed ?? 0}</td>
                    <td>{new Date(c.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampaignHistory;
