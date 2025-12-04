"use client";
import { useDeleteJobMutation, useMyJobQuery } from "@/feature/JobApi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import {
  FiExternalLink,
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";

export default function MyJobsPage() {
  const { data: session } = useSession();
  const email = session?.user?.email;

  // States for search, pagination, and delete
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);

  // Fetch jobs
  const { data: myJob, isLoading, error, refetch } = useMyJobQuery(email);
  const [deleteJob, {isLoading:deleteLoading}]  = useDeleteJobMutation()

  // Delete mutation
  // const [deleteJob] = useDeleteJobMutation();

  // Handle job deletion
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

  // Filter jobs based on search term
  const filteredJobs =
    myJob?.data?.filter(
      (job) =>
        job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // Calculate pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Generate page numbers for pagination
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

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber === "..." || pageNumber === currentPage) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (isLoading) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <p className="text-red-500">Error loading jobs. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Toaster />

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">My jobs</h2>

      {/* Search Bar */}
      <div className="flex justify-end mb-6">
        <div className="relative w-60">
          <input
            type="text"
            placeholder="Search Jobs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <FiSearch
            className="absolute left-3 top-2.5 text-gray-500"
            size={18}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-left text-sm">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200 text-gray-500 font-medium">
              <th className="py-3 px-4">Job Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Job type</th>
              <th className="py-3 px-4">Applicants</th>
              <th className="py-3 px-4">Post date</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-b border-gray-100 text-gray-700 hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-4 font-medium">{job.jobTitle}</td>
                  <td className="py-4 px-4 capitalize">{job.department}</td>
                  {/* Status */}
                  <td className="py-4 px-4">
                    {job.status === "active" ? (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md font-medium">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-md font-medium">
                        Expired
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 capitalize">{job.jobType}</td>
                  <td className="py-4 px-4">0</td>{" "}
                  {/* You might want to add applicants count in your API */}
                  <td className="py-4 px-4">
                    {formatDate(job.createdAt || job.date)}
                  </td>
                  {/* Action */}
                  <td className="py-4 px-4 flex items-center gap-4">
                    <Link href={`/dashboard/manage-jobs/${job._id}`}>
                      <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                        View <FiExternalLink size={15} />
                      </button>
                    </Link>
                    <Link href={`/job/edit/${job._id}`}>
                      <button className="text-gray-600 hover:text-black transition-colors">
                        <FiEdit2 size={16} />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <FiTrash2 size={17} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-8 text-center text-gray-500">
                  {searchTerm
                    ? "No jobs match your search."
                    : "No jobs found. Create your first job!"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION & Results Count */}
      {filteredJobs.length > 0 && (
        <div className="mt-6">
          {/* Results Count */}
          <div className="text-sm text-gray-600 mb-4">
            Showing {indexOfFirstJob + 1} to{" "}
            {Math.min(indexOfLastJob, filteredJobs.length)} of{" "}
            {filteredJobs.length} jobs
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:text-black"
              }`}
            >
              <FiChevronLeft /> Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {getPageNumbers().map((num, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(num)}
                  className={`px-3 py-1 rounded-md ${
                    num === currentPage
                      ? "border border-gray-300 bg-gray-100 font-medium"
                      : num === "..."
                      ? "cursor-default"
                      : "hover:bg-gray-100 cursor-pointer"
                  }`}
                  disabled={num === "..."}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:text-black"
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
