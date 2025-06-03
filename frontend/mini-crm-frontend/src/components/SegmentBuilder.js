import React, { useState } from "react";
import axios from 'axios';
import { Query, Builder } from "@react-awesome-query-builder/antd";
import { Utils as QbUtils } from "@react-awesome-query-builder/core";
import API from "../services/api";
import config from "../segmentBuilderConfig";
import "antd/dist/reset.css";
import "@react-awesome-query-builder/ui/css/styles.css";
import "@react-awesome-query-builder/antd/css/styles.css";
import useAuth from "../hooks/useAuth";
import './SegmentBuilder.css'; // Import CSS for animations

const initialTree = QbUtils.checkTree(
  QbUtils.loadTree({ id: QbUtils.uuid(), type: "group" }),
  config
);

export default function SegmentBuilder() {
  const { user, loading } = useAuth();
  const [tree, setTree] = useState(initialTree);
  const [segmentName, setSegmentName] = useState("");
  const [preview, setPreview] = useState(null);

  const handleChange = (immutableTree) => {
    setTree(immutableTree);
  };

  const handlePreview = async () => {
    const jsonLogic = QbUtils.jsonLogicFormat(tree, config);
    try {
      const res = await API.post("/segments/preview", { rules: jsonLogic });
      setPreview(res.data.size);
    } catch (error) {
      console.error("Error fetching preview:", error.response?.data || error.message);
      alert("Failed to fetch audience preview.");
    }
  };

  const handleSave = async () => {
    if (loading) {
      alert("Checking user status. Please wait...");
      return;
    }
    if (!user) {
      alert("User not logged in. Please login first.");
      return;
    }

    const campaignData = {
      name: segmentName,
      segmentRules: tree,
      createdBy: user._id,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/campaigns",
        campaignData,
        { withCredentials: true }
      );
      console.log("Campaign saved:", response.data);
      alert("Campaign saved successfully!");
    } catch (error) {
      console.error("Error saving campaign:", error.response?.data || error.message);
      alert("Failed to save campaign.");
    }
  };

  return (
    <div className="segment-bg py-5 fade-in">
      <div className="container">
        <div className="card segment-card shadow-lg p-4 rounded-4">
          <h3 className="mb-4 text-center text-gradient fw-bold">Define Audience Segment</h3>

          <div className="mb-3">
            <label className="form-label fw-semibold">Segment / Campaign Name</label>
            <input
              type="text"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              className="form-control rounded-pill px-4"
              placeholder="Enter a meaningful name"
            />
          </div>

          <div className="border rounded p-3 mb-4 bg-light">
            <Query
              {...config}
              value={tree}
              onChange={handleChange}
              renderBuilder={(props) => <Builder {...props} />}
            />
          </div>

          <div className="d-flex align-items-center gap-3 mb-4">
            <button className="btn btn-info rounded-pill px-4 py-2 fw-semibold" onClick={handlePreview}>
              Preview Audience
            </button>
            {preview !== null && (
              <span className="fw-semibold text-success fs-5">
                Audience Size: <span className="badge bg-success text-white">{preview}</span>
              </span>
            )}
          </div>

          <button className="btn btn-success w-100 rounded-pill py-2 fs-5 fw-bold" onClick={handleSave}>
            Save & Launch Campaign
          </button>

          <div className="bg-light p-3 mt-4 rounded">
            <strong>📜 Segment Rule (JSONLogic):</strong>
            <pre className="mt-2 p-2 bg-white border rounded" style={{ maxHeight: 300, overflow: "auto" }}>
              {JSON.stringify(QbUtils.jsonLogicFormat(tree, config), null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
