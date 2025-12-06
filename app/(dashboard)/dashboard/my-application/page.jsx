"use client";

import { useMyApplicationQuery } from "@/feature/ApplicatonApi";
import { useSession } from "next-auth/react";
import {
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiFileText,
  FiDollarSign,
  FiPhone,
  FiMail,
  FiCalendar,
  FiBriefcase,
} from "react-icons/fi";
import { useState, useMemo } from "react";

export default function ApplicationsPage() {
  const { data } = useSession();
  const email = data?.user?.email;

  const {
    data: application,
    isLoading,
    isError,
  } = useMyApplicationQuery(email);
  const applicationsData = application?.data || [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal state
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate stats from real data
  const totalApplications = applicationsData.length;
  const shortlisted = applicationsData.filter(
    (app) => app.applicationStatus === "shortlisted"
  ).length;
  const pending = applicationsData.filter(
    (app) => app.applicationStatus === "pending"
  ).length;
  const rejected = applicationsData.filter(
    (app) => app.applicationStatus === "rejected"
  ).length;
  const interviewScheduled = applicationsData.filter(
    (app) => app.applicationStatus === "interview"
  ).length;

  const stats = [
    {
      label: "Total applications",
      value: totalApplications.toString().padStart(2, "0"),
      icon: <FiUsers size={22} />,
    },
    {
      label: "Shortlisted Applications",
      value: shortlisted.toString().padStart(2, "0"),
      icon: <FiCheckCircle size={22} />,
    },
    {
      label: "Under review",
      value: pending.toString().padStart(2, "0"),
      icon: <FiClock size={22} />,
    },
    {
      label: "Interview Scheduled",
      value: interviewScheduled.toString().padStart(2, "0"),
      icon: <FiClock size={22} />,
    },
  ];

  // Format date to match design (MM/DD/YYYY)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  // Format date and time for modal
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Map API data to table format
  const tableApplications = useMemo(
    () =>
      applicationsData.map((app) => ({
        id: app._id,
        title: app.job.jobTitle || app.job || "Job Title",
        company: app.jobPoster?.split("@")[0] || "Company",
        date: formatDate(app.createdAt),
        type: app.jobType || "Full time",
        status:
          app.applicationStatus?.charAt(0).toUpperCase() +
            app.applicationStatus?.slice(1) || "Pending",
        rawStatus: app.applicationStatus,
        fullData: app,
      })),
    [applicationsData]
  );

  // Calculate pagination
  const totalPages = Math.ceil(tableApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentApplications = tableApplications.slice(startIndex, endIndex);

  // Generate page numbers with ellipsis logic
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 6;

    if (totalPages <= maxVisiblePages) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, last page, and pages around current page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  // Pagination handlers
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Modal handlers
  const openModal = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
    // Prevent background scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
    // Restore background scrolling
    document.body.style.overflow = "auto";
  };

  // Badge color system identical to Figma
  const badgeColors = {
    pending: "bg-yellow-100 text-yellow-700",
    Pending: "bg-yellow-100 text-yellow-700",
    "Under Review": "bg-yellow-100 text-yellow-700",
    reviewing: "bg-yellow-100 text-yellow-700",
    expired: "bg-red-100 text-red-700",
    Expired: "bg-red-100 text-red-700",
    shortlisted: "bg-green-100 text-green-700",
    Shortlisted: "bg-green-100 text-green-700",
    interview: "bg-blue-100 text-blue-700",
    "Interview Scheduled": "bg-blue-100 text-blue-700",
    interview_scheduled: "bg-blue-100 text-blue-700",
    "Application sent": "bg-purple-100 text-purple-700",
    sent: "bg-purple-100 text-purple-700",
    rejected: "bg-red-200 text-red-800",
    Rejected: "bg-red-200 text-red-800",
  };

  if (isLoading) {
    return (
      <div className="w-full px-8 py-10 bg-white flex justify-center items-center min-h-[400px]">
        <div className="text-gray-600">Loading applications...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full px-8 py-10 bg-white flex justify-center items-center min-h-[400px]">
        <div className="text-red-600">Error loading applications</div>
      </div>
    );
  }

  return (
    <div className="w-full px-8 py-10 bg-white">
      {/* =================== TOP STATS =================== */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-[#F5F5F5] rounded-xl p-5 flex items-center gap-4"
          >
            <div className="text-gray-700">{item.icon}</div>
            <div>
              <p className="text-sm text-gray-600">{item.label}</p>
              <h3 className="text-xl font-semibold mt-1">{item.value}</h3>
            </div>
          </div>
        ))}
      </div> */}

      {/* =================== TABLE TITLE =================== */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-800">My Applications</h2>
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1}-
          {Math.min(endIndex, tableApplications.length)} of{" "}
          {tableApplications.length} applications
        </div>
      </div>

      {/* =================== TABLE =================== */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 font-medium">
              <th className="py-3">Job Title</th>
              <th className="py-3">Company</th>
              <th className="py-3">Apply date</th>
              <th className="py-3">Job type</th>
              <th className="py-3">Status</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentApplications.length > 0 ? (
              currentApplications.map((app, i) => (
                <tr
                  key={app.id || i}
                  className="border-b border-gray-100 hover:bg-gray-50 text-gray-700"
                >
                  <td className="py-4">{app.title}</td>
                  <td className="py-4">{app.company}</td>
                  <td className="py-4">{app.date}</td>
                  <td className="py-4">{app.type}</td>

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-md font-medium ${
                        badgeColors[app.rawStatus] ||
                        badgeColors[app.status] ||
                        badgeColors["pending"]
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="py-4">
                    <button
                      onClick={() => openModal(app.fullData)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View details <FiArrowRight size={15} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* =================== REAL PAGINATION =================== */}
      {tableApplications.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-4 mt-10 text-sm text-gray-600">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "hover:text-black cursor-pointer"
            }`}
          >
            <FiChevronLeft /> Previous
          </button>

          <div className="flex items-center gap-2">
            {generatePageNumbers().map((pageNum, index) =>
              pageNum === "..." ? (
                <span key={`ellipsis-${index}`} className="px-1">
                  …
                </span>
              ) : (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === pageNum
                      ? "border border-gray-300 bg-gray-100 text-gray-800 font-medium"
                      : "hover:text-black hover:bg-gray-50 cursor-pointer"
                  }`}
                >
                  {pageNum}
                </button>
              )
            )}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "hover:text-black cursor-pointer"
            }`}
          >
            Next <FiChevronRight />
          </button>
        </div>
      )}

      {/* =================== APPLICATION DETAILS MODAL =================== */}
      {isModalOpen && selectedApplication && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Application Details
                </h2>
                <p className="text-gray-600 mt-1">
                  Complete application information
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Application Status Badge */}
              <div className="mb-6">
                <span
                  className={`px-4 py-2 rounded-lg font-medium ${
                    badgeColors[selectedApplication.applicationStatus] ||
                    badgeColors["pending"]
                  }`}
                >
                  Status:{" "}
                  {selectedApplication.applicationStatus
                    ?.charAt(0)
                    .toUpperCase() +
                    selectedApplication.applicationStatus?.slice(1) ||
                    "Pending"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Personal Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FiBriefcase /> Job Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Job ID</p>
                        <p className="font-medium">
                          {selectedApplication.job?._id || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Job Poster</p>
                        <p className="font-medium">
                          {selectedApplication.jobPoster || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FiFileText /> Personal Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="font-medium">
                          {selectedApplication.firstName}{" "}
                          {selectedApplication.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium flex items-center gap-2">
                          <FiMail size={14} /> {selectedApplication.applicant}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium flex items-center gap-2">
                          <FiPhone size={14} />{" "}
                          {selectedApplication.phone ||
                            selectedApplication.phoneNumber ||
                            "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Application Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FiCalendar /> Application Timeline
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Applied On</p>
                        <p className="font-medium">
                          {formatDateTime(selectedApplication.createdAt)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Last Updated</p>
                        <p className="font-medium">
                          {formatDateTime(selectedApplication.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FiDollarSign /> Salary & Documents
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Expected Salary</p>
                        <p className="font-medium">
                          {selectedApplication.expectedSalary
                            ? `$${selectedApplication.expectedSalary}`
                            : "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">CV/Resume</p>
                        {selectedApplication.cv ? (
                          <a
                            href={selectedApplication.cv}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-2"
                          >
                            <FiFileText size={14} /> View CV
                          </a>
                        ) : (
                          <p className="font-medium text-gray-500">
                            Not provided
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Letter Section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Cover Letter
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  {selectedApplication.coverLetter ? (
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedApplication.coverLetter}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">
                      No cover letter provided
                    </p>
                  )}
                </div>
              </div>

              {/* Application ID */}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
