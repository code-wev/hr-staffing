"use client";

import { FiUsers, FiClock, FiCheckCircle, FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ApplicationsPage() {
  const stats = [
    { label: "Total applications", value: "07", icon: <FiUsers size={22} /> },
    { label: "Shortlisted Applications", value: "06", icon: <FiCheckCircle size={22} /> },
    { label: "Interview Scheduled", value: "03", icon: <FiClock size={22} /> },
    { label: "Under review", value: "03", icon: <FiClock size={22} /> },
  ];

  const applications = [
    {
      title: "Frontend developer",
      company: "Green Valley Foods",
      date: "04/01/2025",
      type: "Full time",
      status: "Under Review",
    },
    {
      title: "Clinical Nurse Specialist (CNS)",
      company: "Urban Solutions Co",
      date: "05/01/2025",
      type: "Part time",
      status: "Expired",
    },
    {
      title: "Licensed Practical Nurse (LPN)",
      company: "Quantum Dynamics Ltd",
      date: "06/01/2025",
      type: "Internship",
      status: "Shortlisted",
    },
    {
      title: "Pediatric Nurse Practitioner (PNP)",
      company: "Global Eco Ventures",
      date: "07/01/2025",
      type: "Contract",
      status: "Interview Scheduled",
    },
    {
      title: "Nurse Practitioner (NP)",
      company: "FB International BD",
      date: "08/01/2025",
      type: "Freelance",
      status: "Application sent",
    },
    {
      title: "Registered Nurse (ER)",
      company: "NextGen Robotics",
      date: "09/01/2025",
      type: "Temporary",
      status: "Shortlisted",
    },
    {
      title: "Operating Room Nurse (ORN)",
      company: "Tech Innovations Corp",
      date: "10/01/2025",
      type: "Remote",
      status: "Rejected",
    },
  ];

  // Badge color system identical to Figma
  const badgeColors = {
    "Under Review": "bg-yellow-100 text-yellow-700",
    "Expired": "bg-red-100 text-red-700",
    "Shortlisted": "bg-green-100 text-green-700",
    "Interview Scheduled": "bg-blue-100 text-blue-700",
    "Application sent": "bg-purple-100 text-purple-700",
    "Rejected": "bg-red-200 text-red-800",
  };

  return (
    <div className="w-full px-8 py-10 bg-white">

      {/* =================== TOP STATS =================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
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
      </div>

      {/* =================== TABLE TITLE =================== */}
      <h2 className="text-xl font-semibold text-gray-800 mb-5">Recent Applications</h2>

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
            {applications.map((app, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 text-gray-700">
                <td className="py-4">{app.title}</td>
                <td className="py-4">{app.company}</td>
                <td className="py-4">{app.date}</td>
                <td className="py-4">{app.type}</td>

                <td className="py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-md ${badgeColors[app.status]}`}
                  >
                    {app.status}
                  </span>
                </td>

                <td className="py-4">
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm">
                    View details <FiArrowRight size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =================== PAGINATION =================== */}
      <div className="flex justify-center items-center gap-4 mt-10 text-sm text-gray-600">
        <button className="flex items-center gap-1 hover:text-black">
          <FiChevronLeft /> Previous
        </button>

        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((num) =>
            num === 1 ? (
              <span
                key={num}
                className="px-3 py-1 border border-gray-300 rounded-md bg-gray-100"
              >
                1
              </span>
            ) : (
              <span
                key={num}
                className="px-3 py-1 hover:text-black cursor-pointer"
              >
                {num}
              </span>
            )
          )}
          <span>…</span>
        </div>

        <button className="flex items-center gap-1 hover:text-black">
          Next <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
