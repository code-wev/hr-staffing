"use client";

import Link from "next/link";

export default function JobsTable() {
  const jobs = [
    {
      title: "Senior Front-end Engineer",
      applicants: 29,
      date: "11/05/2025",
      status: "Active",
    },
    {
      title: "Junior Front-end Developer",
      applicants: 29,
      date: "12/05/2025",
      status: "Active",
    },
    {
      title: "UI/UX Designer",
      applicants: 29,
      date: "01/06/2025",
      status: "Active",
    },
    {
      title: "Backend Developer",
      applicants: 29,
      date: "02/07/2025",
      status: "Ended",
    },
    {
      title: "Product Manager",
      applicants: 29,
      date: "03/08/2025",
      status: "Ended",
    },
  ];

  return (
    <div className="w-full mx-auto py-14">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        Created Jobs
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 text-sm text-gray-600">
              <th className="pb-3">Created Jobs</th>
              <th className="pb-3">Applicants</th>
              <th className="pb-3">Application date</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {jobs.map((job, i) => (
              <tr key={i} className="border-b border-gray-100 h-14">
                <td>{job.title}</td>

                <td className="text-gray-600">{job.applicants}</td>

                <td className="text-gray-600">{job.date}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-medium ${
                      job.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>

                <td>
                  <Link
                    href="/dashboard/manage-jobs"
                    className="text-[#0097B2] hover:underline flex items-center gap-1"
                  >
                    View details →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
