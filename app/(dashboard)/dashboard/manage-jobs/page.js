import JobApplicantsTabs from "@/components/Dashboard/Admin/JobApplicantsTabs";
import JobStats from "@/components/Dashboard/Admin/JobStats";
import React from "react";

const page = () => {
  return (
    <div>
      <JobStats />
      <JobApplicantsTabs />
    </div>
  );
};

export default page;
