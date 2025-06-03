import { AntdConfig } from "@react-awesome-query-builder/antd";

const config = {
  ...AntdConfig,
  fields: {
    name: { label: "Name", type: "text" },
    email: { label: "Email", type: "text" },
    totalSpend: {
      label: "Total Spend",
      type: "number",
      fieldSettings: { min: 0 }
    },
    visits: { label: "Visits", type: "number" },
    lastActive: { label: "Last Active", type: "date" },
    tags: {
      label: "Tags",
      type: "select",
      fieldSettings: {
        listValues: [
          { value: "VIP", title: "VIP" },
          { value: "Churned", title: "Churned" },
          { value: "New", title: "New" }
        ]
      }
    }
  }
};

export default config;
