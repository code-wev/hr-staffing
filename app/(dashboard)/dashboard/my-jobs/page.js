"use client";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { FiExternalLink, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function MyJobsPage() {
  const jobs = [
    {
      title: "Frontend developer",
      category: "Engineering",
      status: "Active",
      type: "Full time",
      applicants: 67,
      date: "11/02/2025",
    },
    {
      title: "Clinical Nurse Specialist (CNS)",
      category: "Sales",
      status: "Expired",
      type: "Part time",
      applicants: 23,
      date: "11/02/2025",
    },
    {
      title: "Licensed Practical Nurse (LPN)",
      category: "Product Management",
      status: "Active",
      type: "Internship",
      applicants: 45,
      date: "11/02/2025",
    },
    {
      title: "Pediatric Nurse Practitioner (PNP)",
      category: "Human Resources",
      status: "Expired",
      type: "Contract",
      applicants: 89,
      date: "11/02/2025",
    },
    {
      title: "Nurse Practitioner (NP)",
      category: "Customer Support",
      status: "Active",
      type: "Freelance",
      applicants: 78,
      date: "11/02/2025",
    },
    {
      title: "Registered Nurse (ER)",
      category: "Marketing",
      status: "Active",
      type: "Temporary",
      applicants: 34,
      date: "11/02/2025",
    },
    {
      title: "Operating Room Nurse (ORN)",
      category: "Design",
      status: "Expired",
      type: "Remote",
      applicants: 56,
      date: "11/02/2025",
    },
  ];

  return (
    <div className="w-full">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">My jobs</h2>

      {/* Search Bar */}
      <div className="flex justify-end mb-6">
        <div className="relative w-60">
          <input
            type="text"
            placeholder="Search Jobs"
            className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 font-medium">
              <th className="py-3">Job Title</th>
              <th className="py-3">Category</th>
              <th className="py-3">Status</th>
              <th className="py-3">Job type</th>
              <th className="py-3">Applicants</th>
              <th className="py-3">Post date</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {jobs.map((job, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 text-gray-700 hover:bg-gray-50 transition"
              >
                <td className="py-4">{job.title}</td>
                <td className="py-4">{job.category}</td>

                {/* Status */}
                <td className="py-4">
                  {job.status === "Active" ? (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-md">
                      Expired
                    </span>
                  )}
                </td>

                <td className="py-4">{job.type}</td>
                <td className="py-4">{job.applicants}</td>
                <td className="py-4">{job.date}</td>

                {/* Action */}
                <td className="py-4 flex items-center gap-4 text-blue-600">
                 <Link href="/dashboard/manage-jobs">
                     <button className="flex items-center gap-1 text-sm">
                    View <FiExternalLink size={15} />
                  </button>
                 </Link>
                  <button className="text-gray-600 hover:text-black">
                    <FiEdit2 size={16} />
                  </button>
                  <button className="text-gray-600 hover:text-red-600">
                    <FiTrash2 size={17} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-10 text-sm text-gray-600">
        <button className="flex items-center gap-1 hover:text-black">
          <FiChevronLeft /> Previous
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((num, i) =>
            num === 1 ? (
              <span
                key={i}
                className="px-3 py-1 border border-gray-300 rounded-md bg-gray-100"
              >
                1
              </span>
            ) : (
              <span key={i} className="px-3 py-1 hover:text-black cursor-pointer">
                {num}
              </span>
            )
          )}
          <span className="px-3 py-1">…</span>
        </div>

        <button className="flex items-center gap-1 hover:text-black">
          Next <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
