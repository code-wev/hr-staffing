"use client";

import { useMyJobQuery, useSingleUserQuery } from "@/feature/JobApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiPhone, FiMail, FiMapPin, FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function PosterProfilepage() {
  const { id } = useParams();
  const { data: allJob, isLoading } = useMyJobQuery(id);
  const { data: user } = useSingleUserQuery(id);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedJobs, setPaginatedJobs] = useState([]);
  
  const profile = user?.data?.[0] || {};
  const jobs = allJob?.data || [];
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  // Update paginated data when jobs or currentPage changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedJobs(jobs.slice(startIndex, endIndex));
  }, [jobs, currentPage]);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first page, last page, and pages around current page
      if (currentPage <= 3) {
        // Near the beginning
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // In the middle
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  // Handle page change
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="mx-auto pb-16">

      {/* ======================= HEADER SECTION ======================= */}
      <div className="bg-[#F5F5F5] py-20 text-center">
        <h1 className="text-4xl font-semibold text-gray-800">
          {profile?.name || "Unnamed User"}
        </h1>

        {/* Contact Row */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-6 text-gray-600 text-sm">

          {/* Phone */}
          <div className="flex items-center gap-2">
            <FiPhone size={15} />
            <span>{profile?.phone || "Phone not added yet"}</span>
          </div>

          <span className="text-gray-400">•</span>

          {/* Email */}
          <div className="flex items-center gap-2">
            <FiMail size={15} />
            <span>{profile?.email || "Email not added yet"}</span>
          </div>

          <span className="text-gray-400">•</span>

          {/* Address */}
          <div className="flex items-center gap-2">
            <FiMapPin size={15} />
            <span>{profile?.address || "Address not added yet"}</span>
          </div>

        </div>
      </div>

      {/* Blue border line */}
      <div className="w-full h-[3px] bg-[#1C7ED6]"></div>

      {/* ======================= CREATED JOBS TITLE ======================= */}
      <div className="flex justify-between items-center mt-10 mb-4">
        <h2 className="text-[20px] font-semibold">Created Jobs</h2>
        
        {/* Results count */}
        {jobs.length > 0 && (
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, jobs.length)}</span> -{" "}
            <span className="font-medium">{Math.min(currentPage * itemsPerPage, jobs.length)}</span> of{" "}
            <span className="font-medium">{jobs.length}</span> jobs
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          
          {/* TABLE HEADER */}
          <thead>
            <tr className="border-b border-gray-200 text-sm text-gray-600">
              <th className="pb-3">Created Jobs</th>
              <th className="pb-3">Application date</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody className="text-[15px]">
            {paginatedJobs.map((job) => (
              <tr key={job._id} className="border-b border-gray-200 hover:bg-gray-50 transition">

                {/* Job Title */}
                <td className="py-4">{job.jobTitle}</td>

                {/* Date */}
                <td className="py-4">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>

                {/* STATUS BADGE */}
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.status === "active" ? "Active" : "Ended"}
                  </span>
                </td>

                {/* ACTION BUTTON */}
                <td className="py-4">
                  <Link href={`/dashboard/my-jobs/${job?._id}`}>
                    <button className="flex items-center gap-2 text-[#0097B2] hover:underline">
                      View details <FiArrowRight size={16} />
                    </button>
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Page info */}
            <div className="text-sm text-gray-600">
              Page <span className="font-medium">{currentPage}</span> of{" "}
              <span className="font-medium">{totalPages}</span>
            </div>
            
            {/* Pagination controls */}
            <div className="flex items-center gap-2">
              {/* Previous button */}
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-4 py-2 rounded-md border ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                    : "hover:bg-gray-50 border-gray-300 text-gray-700 hover:text-gray-900"
                }`}
              >
                <FiChevronLeft size={18} />
                Previous
              </button>
              
              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNum, index) => (
                  pageNum === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                      ...
                    </span>
                  ) : (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                        currentPage === pageNum
                          ? "bg-[#0097B2] text-white border-[#1C7ED6]"
                          : "border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                ))}
              </div>
              
              {/* Next button */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-4 py-2 rounded-md border ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                    : "hover:bg-gray-50 border-gray-300 text-gray-700 hover:text-gray-900"
                }`}
              >
                Next
                <FiChevronRight size={18} />
              </button>
            </div>
            
            {/* Items per page info */}
            <div className="text-sm text-gray-600">
              {itemsPerPage} per page
            </div>
          </div>
        )}
      </div>

      {/* EMPTY STATE */}
      {jobs.length === 0 && !isLoading && (
        <div className="text-center py-10 text-gray-500 border border-gray-200 rounded-lg bg-gray-50">
          <div className="text-lg font-medium mb-2">No jobs created yet</div>
          <div className="text-sm">This user hasn't posted any jobs yet.</div>
        </div>
      )}

      {/* LOADING STATE */}
      {isLoading && (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1C7ED6]"></div>
          <div className="mt-2 text-gray-500">Loading jobs...</div>
        </div>
      )}

    </div>
  );
}