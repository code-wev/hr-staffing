"use client";

import { useDeleteJobMutation, useMyJobOverviewMutation, useMyJobQuery } from "@/feature/JobApi";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiUsers,
  FiUserCheck,
  FiGrid,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

export default function ApplicantDashboard() {
  const { data: session } = useSession();
  const email = session?.user?.email;

  // State for search, pagination, and loading
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [ovr, setOvr] = useState({})
    const [deleteJob, { isLoading: deleteLoading }] = useDeleteJobMutation();
 
  // Fetch overview data
  const [
    myJobOverview,
    { data: overviewData, isLoading: overviewLoading, error: overviewError },
  ] = useMyJobOverviewMutation();

  // Fetch my jobs data
  const {
    data: myJobsData,
    isLoading: jobsLoading,
    error: jobsError,
    refetch: refetchJobs,
  } = useMyJobQuery(email);

  // Fetch overview on component mount or when email changes

  const fetchOVerviw = async () => {
    const overview = await myJobOverview({ email });
    setOvr(overview)
 
  };
  useEffect(() => {
    if (email) {
      fetchOVerviw();
    }
  }, [email, myJobOverview]);

  // Filter jobs based on search term
  const filteredJobs =
    myJobsData?.data?.filter(
      (job) =>
        job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // Calculate pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Format category name
  const formatCategory = (department) => {
    const categoryMap = {
      engineering: "Engineering",
      hr: "Human Resources",
      sales: "Sales",
      marketing: "Marketing",
      operations: "Operations",
      finance: "Finance",
      management: "Management",
    };
    return (
      categoryMap[department] ||
      department?.charAt(0)?.toUpperCase() + department?.slice(1) ||
      "N/A"
    );
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handle delete job (you'll need to implement this)
  const handleDeleteJob = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      await deleteJob(id).unwrap();
      toast.success("Job deleted successfully");
      refetch(); // Refresh the job list
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete job");
      console.error("Delete error:", error);
    }
  };
  // Handle edit job
  const handleEditJob = (jobId) => {
    // Navigate to edit page
    window.location.href = `/job/edit/${jobId}`;
  };

  // Loading state
  if (overviewLoading || jobsLoading) {
    return (
      <div className="w-full bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (overviewError || jobsError) {
    return (
      <div className="w-full bg-white min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error loading data. Please try again.</p>
      </div>
    );
  }

  // Extract overview data
  const overview = overviewData?.data || {};
  const stats = {
    totalJobsPosted: overview.totalJobsPosted || 0,
    activeJobs: overview.activeJobs || 0,
    totalApplicants: overview.totalApplicants || 0,
  };
console.log(ovr, "ovr");
  return (
    <div className="w-full bg-white min-h-screen p-6">
      <Toaster />

      {/* ================= STAT CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* CARD 1 - Total Job Posted */}
        <div className="bg-[#F7F7F7] px-6 py-5 relative rounded-lg">
          <FiUsers className="absolute right-5 top-4 text-[#6F6F6F] text-[18px]" />
          <p className="text-[14px] text-[#4C4C4C] mb-1">Total Job Posted</p>
          <p className="text-[28px] font-semibold text-black leading-none">
            {ovr?.data?.totalJob}
          </p>
        </div>

        {/* CARD 2 - Active jobs */}
        <div className="bg-[#F7F7F7] px-6 py-5 relative rounded-lg">
          <FiUserCheck className="absolute right-5 top-4 text-[#6F6F6F] text-[18px]" />
          <p className="text-[14px] text-[#4C4C4C] mb-1">Active jobs</p>
          <p className="text-[28px] font-semibold text-black leading-none">
            {ovr?.data?.totalActiveJob}
          </p>
        </div>

        {/* CARD 3 - Total Applicants */}
        <div className="bg-[#F7F7F7] px-6 py-5 relative rounded-lg">
          <FiGrid className="absolute right-5 top-4 text-[#6F6F6F] text-[18px]" />
          <p className="text-[14px] text-[#4C4C4C] mb-1">Total Applicants</p>
          <p className="text-[28px] font-semibold text-black leading-none">
            {ovr?.data?.totalAplication
}
          </p>
        </div>
      </div>

      {/* ================= TITLE + SEARCH ================= */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h2 className="text-[22px] font-semibold text-[#111]">
          Latest posted jobs
        </h2>

        <div className="relative">
          <input
            type="text"
            placeholder="Search Jobs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[170px] md:w-[230px] text-[13px] border border-[#D9D9D9] rounded-md px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[15px] text-[#7E7E7E]" />
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto border border-[#EAEAEA] rounded-lg">
        <table className="w-full border-collapse text-[13px]">
          <thead className="bg-gray-50">
            <tr className="border-b border-[#EAEAEA] text-[#6B6B6B]">
              <th className="text-left py-3 px-4 font-medium">Job Post</th>
              <th className="text-left py-3 px-4 font-medium">Category</th>
              <th className="text-left py-3 px-4 font-medium">Status</th>
              <th className="text-left py-3 px-4 font-medium">Job type</th>
              <th className="text-left py-3 px-4 font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="text-[#222]">
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-b border-[#F1F1F1] hover:bg-[#FAFAFA] transition"
                >
                  <td className="py-4 px-4 font-medium">{job.jobTitle}</td>
                  <td className="py-4 px-4 text-[#555]">
                    {formatCategory(job.department)}
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-[3px] text-[12px] rounded-md ${
                        job.status === "active"
                          ? "bg-[#E5F8EC] text-[#2EB872] font-medium"
                          : "bg-[#FDECEC] text-[#E05454] font-medium"
                      }`}
                    >
                      {job.status === "active" ? "Active" : "Expired"}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-[#555] capitalize">
                    {job.jobType}
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleEditJob(job._id)}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                        title="Edit job"
                      >
                        <FiEdit2 className="text-[16px]" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job._id)}
                        className="text-gray-600 hover:text-red-600 transition-colors"
                        title="Delete job"
                      >
                        <FiTrash2 className="text-[16px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">
                  {searchTerm
                    ? "No jobs match your search."
                    : "No jobs found. Create your first job!"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      {filteredJobs.length > 0 && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
          {/* Results count */}
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstJob + 1} to{" "}
            {Math.min(indexOfLastJob, filteredJobs.length)} of{" "}
            {filteredJobs.length} jobs
          </div>

          {/* Pagination controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 text-sm ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#7E7E7E] hover:text-black"
              }`}
            >
              <FiChevronLeft /> Previous
            </button>

            <div className="flex items-center gap-2">
              {getPageNumbers().map((pageNum, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={pageNum === "..."}
                  className={`w-8 h-8 rounded-md text-sm flex items-center justify-center ${
                    pageNum === currentPage
                      ? "bg-[#111111] text-white"
                      : pageNum === "..."
                      ? "text-[#555] cursor-default"
                      : "text-[#555] hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 text-sm ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#7E7E7E] hover:text-black"
              }`}
            >
              Next <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
