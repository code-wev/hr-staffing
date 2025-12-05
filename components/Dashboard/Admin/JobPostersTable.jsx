"use client";

import { useAllPosterQuery } from "@/feature/JobApi";
import Link from "next/link";
import { FiSearch, FiChevronRight, FiTrash2 } from "react-icons/fi";
import { useState } from "react";

export default function JobPostersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const { data: allPostrer, isLoading, isError } = useAllPosterQuery();
  const jobPosters = allPostrer?.data || [];

  // Filter job posters based on search term
  const filteredPosters = jobPosters.filter((poster) =>
    poster.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    poster.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total jobs and applicants for each poster
  // Note: You'll need to fetch this data from your backend
  // For now, I'll create dummy data for demonstration
  const posterStats = filteredPosters.map(poster => ({
    ...poster,
    postedJobs: Math.floor(Math.random() * 20) + 1, // Replace with actual data
    totalApplicants: Math.floor(Math.random() * 200) + 10, // Replace with actual data
  }));

  // Pagination logic
  const totalPages = Math.ceil(posterStats.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosters = posterStats.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="w-full px-6 py-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full px-6 py-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">Error loading job posters. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] font-semibold text-black">Job Posters</h2>

        {/* Search Box */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email"
            className="border border-gray-300 rounded-md pl-10 pr-3 py-2 w-[230px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Summary */}
 

      {/* TABLE */}
      <div className="overflow-x-auto  border-gray-200 rounded-lg">
        <table className="w-full text-left">
          <thead className="">
            <tr className="border-b border-gray-300">
              <th className="py-3 px-4 text-sm text-gray-700 font-semibold ">
                Poster / Company
              </th>
              <th className="py-3 px-4 text-sm text-gray-700 font-semibold ">
                Contact
              </th>
              <th className="py-3 px-4 text-sm text-gray-700 font-semibold ">
                Member Since
              </th>
             
            
              <th className="py-3 px-4 text-sm text-gray-700 font-semibold ">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {currentPosters.length > 0 ? (
              currentPosters.map((poster) => (
                <tr
                  key={poster._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="text-[15px] font-medium text-gray-900">
                      {poster.name}
                    </div>
                    <div className="text-xs text-gray-500">Role: {poster.role}</div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="text-gray-900">{poster.email}</div>
                    <div className="text-xs text-gray-500">
                      Joined: {formatDate(poster.createdAt)}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="text-gray-900">
                      {formatDate(poster.createdAt)}
                    </div>
                  </td>

                

                

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-4">
                      <Link href={`/dashboard/poster-profile/${poster._id}`}>
                        <button className="text-[#0097B2] text-sm font-medium hover:underline hover:text-[#007a91] transition-colors">
                          View Profile
                        </button>
                      </Link>

                      <button className="text-gray-600 hover:text-blue-600 transition-colors">
                        <FiChevronRight className="text-lg" />
                      </button>
                      
                      {/* <button
                        className="text-gray-600 hover:text-red-600 transition-colors"
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete ${poster.name}?`)) {
                            console.log(`Delete poster: ${poster._id}`);
                            // Add your delete logic here
                          }
                        }}
                      >
                        <FiTrash2 className="text-lg" />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-gray-500">
                  {searchTerm ? "No job posters found matching your search." : "No job posters available."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {posterStats.length > itemsPerPage && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, posterStats.length)} of {posterStats.length} posters
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md border border-gray-300 text-sm ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
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
                    className={`px-3 py-1 text-sm rounded-md border ${
                      currentPage === pageNum
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:bg-gray-100 text-gray-700"
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
              className={`px-3 py-1 rounded-md border border-gray-300 text-sm ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}