"use client";

import {
  useAllApplicantQuery,
  useUpdateApplicationStatusMutation,
} from "@/feature/ApplicatonApi";
import { useSingleJobQuery } from "@/feature/JobApi";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  FiAlertTriangle,
  FiClock,
  FiUserCheck,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";

export default function JobDetailsPage() {
  const params = useParams();
  const id = params?.id;

  const [activeTab, setActiveTab] = useState("applicants");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(null);
  const [statusChangeLoading, setStatusChangeLoading] = useState(false);
  const itemsPerPage = 10;

  const dropdownRef = useRef(null);

  const { data: jobDetails } = useSingleJobQuery(id);
  const { data: allApplicant } = useAllApplicantQuery(id);
  const [updateApplicationStatus, { isLoading }] =
    useUpdateApplicationStatusMutation();

  const job = jobDetails?.data[0];
  const applicants = allApplicant?.data || [];

  // Calculate counts
  const totalApplicants = applicants.length;
  const interviewCount = applicants.filter(
    (applicant) => applicant.applicationStatus === "interview"
  ).length;
  const rejectedCount = applicants.filter(
    (applicant) => applicant.applicationStatus === "rejected"
  ).length;
  const underReviewCount = applicants.filter(
    (applicant) =>
      applicant.applicationStatus === "pending" ||
      applicant.applicationStatus === "under_review"
  ).length;
  const shortListedCount = applicants.filter(
    (applicant) => applicant.applicationStatus === "short_list"
  ).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setStatusDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(applicants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentApplicants = applicants.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format date with time
  const formatDateTime = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format status
  const formatStatus = (status) => {
    return status?.charAt(0).toUpperCase() + status?.slice(1) || "Not Set";
  };

  // Open modal with applicant details
  const openModal = (applicant) => {
    setSelectedApplicant(applicant);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApplicant(null);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
      case "under_review":
        return "bg-yellow-100 text-yellow-800";
      case "screening":
        return "bg-blue-100 text-blue-800";
      case "interview":
        return "bg-purple-100 text-purple-800";
      case "short_list":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch (status) {
      case "pending":
      case "under_review":
        return "Under Review";
      case "screening":
        return "Screening";
      case "interview":
        return "Interview";
      case "short_list":
        return "Short Listed";
      case "rejected":
        return "Rejected";
      default:
        return "Not Set";
    }
  };

  // Toggle status dropdown
  const toggleStatusDropdown = (applicantId, e) => {
    e.stopPropagation();
    setStatusDropdownOpen(
      statusDropdownOpen === applicantId ? null : applicantId
    );
  };

  // Handle status change
  const handleStatusChange = async (applicantId, newStatus) => {
    setStatusChangeLoading(true);

    try {
      // Show confirmation alert
      if (
        window.confirm(
          `Are you sure you want to change status to "${getStatusText(
            newStatus
          )}"?`
        )
      ) {
        // Log the data to console
        console.log({
          applicantId: applicantId,
          newStatus: newStatus,
          jobId: id,
        });

        // Make API call to update the status
        const data = {
          id: applicantId,
          status: newStatus,
        };
        await updateApplicationStatus(data).unwrap();

        // Show success message
        alert(`Status changed to "${getStatusText(newStatus)}" successfully!`);

        // Close dropdown
        setStatusDropdownOpen(null);
      }
    } catch (error) {
      console.error("Error changing status:", error);
      alert("Failed to change status. Please try again.");
    } finally {
      setStatusChangeLoading(false);
    }
  };

  // All available status options
  const statusOptions = [
    { value: "interview", label: "Interview" },
    { value: "screening", label: "Screening" },
    { value: "interview", label: "Interview" },
    { value: "short_list", label: "Short Listed" },
    { value: "rejected", label: "Rejected" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {/* Total Applicants */}
        <div className="bg-[#F5F5F5] p-4 rounded-lg flex flex-col">
          <div className="flex justify-between items-center">
            <p className="text-[13px] text-gray-600">Total Applicants</p>
            <FiUsers className="text-gray-700" size={16} />
          </div>
          <p className="text-[22px] font-semibold mt-1">{totalApplicants}</p>
        </div>

        {/* Interviews */}
        <div className="bg-[#F5F5F5] p-4 rounded-lg flex flex-col">
          <div className="flex justify-between items-center">
            <p className="text-[13px] text-gray-600">Interviews</p>
            <FiUserCheck className="text-gray-700" size={16} />
          </div>
          <p className="text-[22px] font-semibold mt-1">{interviewCount}</p>
        </div>

        {/* Rejected */}
        <div className="bg-[#F5F5F5] p-4 rounded-lg flex flex-col">
          <div className="flex justify-between items-center">
            <p className="text-[13px] text-gray-600">Rejected</p>
            <FiAlertTriangle className="text-gray-700" size={16} />
          </div>
          <p className="text-[22px] font-semibold mt-1">{rejectedCount}</p>
        </div>

        {/* Under Review */}
        <div className="bg-[#F5F5F5] p-4 rounded-lg flex flex-col">
          <div className="flex justify-between items-center">
            <p className="text-[13px] text-gray-600">Under review</p>
            <FiClock className="text-gray-700" size={16} />
          </div>
          <p className="text-[22px] font-semibold mt-1">{underReviewCount}</p>
        </div>

        {/* Short listed */}
        <div className="bg-[#F5F5F5] p-4 rounded-lg flex flex-col">
          <div className="flex justify-between items-center">
            <p className="text-[13px] text-gray-600">Short listed</p>
            <FiUserPlus className="text-gray-700" size={16} />
          </div>
          <p className="text-[22px] font-semibold mt-1">{shortListedCount}</p>
        </div>
      </div>

      {/* ---- Title ---- */}
      <h1 className="text-[18px] font-semibold mt-8">
        {job?.jobTitle || "Job Details"}
      </h1>

      {/* ---- Tabs ---- */}
      <div className="flex gap-6 mt-3 border-b border-gray-300">
        <button
          onClick={() => setActiveTab("applicants")}
          className={`pb-3 ${
            activeTab === "applicants"
              ? "text-black font-medium border-b-2 border-black"
              : "text-gray-500"
          }`}
        >
          Applicants
        </button>

        <button
          onClick={() => setActiveTab("details")}
          className={`pb-3 ${
            activeTab === "details"
              ? "text-black font-medium border-b-2 border-black"
              : "text-gray-500"
          }`}
        >
          Job Details
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ------------------------- JOB DETAILS ------------------------- */}
      {/* ------------------------------------------------------------- */}

      {activeTab === "details" && job && (
        <div className="mt-8 space-y-8">
          {/* Job Header */}
          <div>
            <h3 className="text-[24px] font-semibold text-gray-800">
              {job.jobTitle}
            </h3>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-gray-600">
                <span className="font-medium">Company:</span> {job.companyName}
              </p>
              <span className="text-gray-400">•</span>
              <p className="text-gray-600">
                <span className="font-medium">Location:</span> {job.location}
              </p>
              <span className="text-gray-400">•</span>
              <p className="text-gray-600">
                <span className="font-medium">Department:</span>{" "}
                {formatStatus(job.department)}
              </p>
            </div>
          </div>

          {/* Job Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Job Type</p>
              <p className="font-medium mt-1">{formatStatus(job.jobType)}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Pay Type</p>
              <p className="font-medium mt-1">{formatStatus(job.payType)}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Status</p>
              <p
                className={`font-medium mt-1 ${
                  job.status === "active" ? "text-green-600" : "text-red-600"
                }`}
              >
                {job.status}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Application Deadline</p>
              <p className="font-medium mt-1">{formatDate(job.deadline)}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Posted By</p>
              <p className="font-medium mt-1">{job.jobPoster}</p>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h4 className="text-[18px] font-semibold text-gray-800 mb-3">
              Job Description
            </h4>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {job.description || "No description provided."}
              </p>
            </div>
          </div>

          {/* Company Perks */}
          {job.companyPerks && job.companyPerks.length > 0 && (
            <div>
              <h4 className="text-[18px] font-semibold text-gray-800 mb-3">
                Company Perks & Benefits
              </h4>
              <div className="flex flex-wrap gap-3">
                {job.companyPerks.map((perk, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Uploaded File */}
          {job.uploadFile && (
            <div>
              <h4 className="text-[18px] font-semibold text-gray-800 mb-3">
                Attached File
              </h4>
              <a
                href={job.uploadFile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                View Uploaded File
              </a>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* ----------------------- APPLICANTS TAB ----------------------- */}
      {/* ------------------------------------------------------------- */}

      {activeTab === "applicants" && (
        <div className="mt-8">
          {/* Applicants Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-medium">
                {startIndex + 1}-{Math.min(endIndex, applicants.length)}
              </span>{" "}
              of <span className="font-medium">{applicants.length}</span>{" "}
              applicants
            </p>
          </div>

          {/* Applicants Table */}
          <div className="w-full overflow-x-auto rounded-lg  border-gray-300">
            <table className="w-full text-[14px]">
              <thead className="bg-[#E2E8F0] text-gray-700">
                <tr>
                  <th className="py-3 px-5 text-left font-semibold border-b border-gray-300">
                    Name
                  </th>
                  <th className="py-3 px-5 text-left font-semibold border-b border-gray-300">
                    Contact
                  </th>
                  <th className="py-3 px-5 text-left font-semibold border-b border-gray-300">
                    Apply date
                  </th>
                  <th className="py-3 px-5 text-left font-semibold border-b border-gray-300">
                    Status
                  </th>
                  <th className="py-3 px-5 text-left font-semibold border-b border-gray-300">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentApplicants.length > 0 ? (
                  currentApplicants.map((a) => (
                    <tr
                      key={a._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-5 border-b border-gray-300">
                        <div className="font-medium text-gray-900">
                          {a.firstName} {a.lastName}
                        </div>
                        <div className="text-gray-500 text-[13px]">
                          {a.email}
                        </div>
                      </td>

                      <td className="py-4 px-5 border-b border-gray-300">
                        <div className="text-gray-800">{a.applicant}</div>
                        <div className="text-gray-500 text-[13px]">
                          {a.phone}
                        </div>
                      </td>

                      <td className="py-4 px-5 text-gray-700 border-b border-gray-300">
                        {new Date(a.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-4 px-5 border-b border-gray-300 relative">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              a.applicationStatus || a.status
                            )}`}
                          >
                            {getStatusText(a.applicationStatus || a.status)}
                          </span>
                          <button
                            onClick={(e) => toggleStatusDropdown(a._id, e)}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            disabled={statusChangeLoading}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Status Dropdown */}
                        {statusDropdownOpen === a._id && (
                          <div
                            ref={dropdownRef}
                            className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                          >
                            <div className="py-1">
                              {statusOptions.map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() =>
                                    handleStatusChange(a._id, option.value)
                                  }
                                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                                    (a.applicationStatus || a.status) ===
                                    option.value
                                      ? "bg-blue-50 text-blue-700"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-5 border-b border-gray-300">
                        <button
                          onClick={() => openModal(a)}
                          className="text-[#0097B2] font-medium text-[14px] hover:underline"
                        >
                          View Details →
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-500">
                      No applicants found for this job.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {applicants.length > itemsPerPage && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded border border-gray-300 text-sm font-medium ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: Math.min(totalPages, 6) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 6) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 5 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium border border-gray-300 ${
                          currentPage === pageNum
                            ? "bg-black text-white"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded border border-gray-300 text-sm font-medium ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* ---------------------- APPLICANT MODAL ----------------------- */}
      {/* ------------------------------------------------------------- */}

      {isModalOpen && selectedApplicant && (
        <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-300">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  Applicant Details
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mt-1">
                Application ID: {selectedApplicant._id}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">
                      {selectedApplicant.firstName} {selectedApplicant.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedApplicant.applicant}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">
                      {selectedApplicant.phoneNumber ||
                        selectedApplicant.phone ||
                        "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expected Salary</p>
                    <p className="font-medium">
                      {selectedApplicant.expectedSalary
                        ? `$${selectedApplicant.expectedSalary}`
                        : "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Cover Letter
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-line">
                    {selectedApplicant.coverLetter ||
                      "No cover letter provided."}
                  </p>
                </div>
              </div>

              {/* Application Details */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Application Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Application Status</p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-1 ${getStatusColor(
                          selectedApplicant.applicationStatus ||
                            selectedApplicant.status
                        )}`}
                      >
                        {getStatusText(
                          selectedApplicant.applicationStatus ||
                            selectedApplicant.status
                        )}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Applied On</p>
                    <p className="font-medium">
                      {formatDateTime(selectedApplicant.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium">
                      {formatDateTime(selectedApplicant.updatedAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Job Poster</p>
                    <p className="font-medium">{selectedApplicant.jobPoster}</p>
                  </div>
                </div>
              </div>

              {/* CV Link */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Resume/CV
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {selectedApplicant.cv ? (
                    <a
                      href={selectedApplicant.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#0097B2] hover:text-[#007a91] font-medium"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                          clipRule="evenodd"
                        />
                      </svg>
                      View CV/Resume (Opens in new tab)
                    </a>
                  ) : (
                    <p className="text-gray-500">No CV/Resume provided.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-300 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
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
