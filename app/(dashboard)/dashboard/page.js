import DashboardStats from "@/components/Dashboard/Admin/DashboardStats";
import JobPostersTable from "@/components/Dashboard/Admin/JobPostersTable";
import React from "react";

const page = () => {
  return (
    <div>
      <DashboardStats />
      <JobPostersTable />
    </div>
  );
};

export default page;
