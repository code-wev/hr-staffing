"use client";

import React from "react";
import { useSession } from "next-auth/react";
import DashboardStats from "@/components/Dashboard/Admin/DashboardStats";
import JobPostersTable from "@/components/Dashboard/Admin/JobPostersTable";
import ApplicantDashboard from "@/components/Dashboard/client/ApplicantDashboard";
import ApplicationsPage from "@/components/Dashboard/Applicant/ApplicationsPage";

const DashboardPage = () => {
  const { data: session, status } = useSession();

  console.log(session);

  // Show loading state while session loads
  if (status === "loading") {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  // If not logged in
  if (!session) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center text-gray-600">
        Please log in to access your dashboard.
      </div>
    );
  }

  // Extract user role
  const role = session?.user?.role;

  return (
    <div className="w-full">
      {/* ============================ */}
      {/* 🚀 ADMIN DASHBOARD */}
      {/* ============================ */}
      {role === "admin" && (
        <>
          <DashboardStats />
          <JobPostersTable />
        </>
      )}

      {/* ============================ */}
      {/* 👤 APPLICANT DASHBOARD */}
      {/* ============================ */}
      {role === "applicant" && (
        <>
          <ApplicationsPage />
        </>
      )}

      {/* ============================ */}
      {/* 👥 CLIENT DASHBOARD (Optional) */}
      {/* ============================ */}
      {role === "client" && (
        <>
          <ApplicantDashboard />
        </>
      )}
    </div>
  );
};

export default DashboardPage;
