import JobsTable from "@/components/Dashboard/Admin/JobsTable";
import ProfileHeader from "@/components/Dashboard/Admin/ProfileHeader";
import React from "react";

const page = () => {
  return (
    <div className="w-full">
      <ProfileHeader />
      <JobsTable />
    </div>
  );
};

export default page;
