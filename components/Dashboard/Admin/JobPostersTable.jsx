"use client";

import { FiSearch, FiChevronRight, FiTrash2 } from "react-icons/fi";

export default function JobPostersTable() {
  const data = [
    {
      title: "Clinical Nurse Specialist (CNS)",
      email: "NextGenTech@icloud.com",
      phone: "+1 61234 098765",
      posted: 8,
      applicants: 245,
    },
    {
      title: "Clinical Nurse Specialist (CNS)",
      email: "TechInnovations@gmail.com",
      phone: "+1 30546 025456",
      posted: 13,
      applicants: 13,
    },
    {
      title: "Licensed Practical Nurse (LPN)",
      email: "CreativeSolutions@yahoo.com",
      phone: "+1 41578 029876",
      posted: 12,
      applicants: 12,
    },
    {
      title: "Pediatric Nurse Practitioner (PNP)",
      email: "SmartDevelopers@aol.com",
      phone: "+1 71890 123456",
      posted: 11,
      applicants: 11,
    },
    {
      title: "Nurse Practitioner (NP)",
      email: "FutureDesigns@outlook.com",
      phone: "+1 20234 057612",
      posted: 9,
      applicants: 9,
    },
    {
      title: "Registered Nurse (ER)",
      email: "InnovateToday@live.com",
      phone: "+1 91765 432109",
      posted: 10,
      applicants: 10,
    },
    {
      title: "Operating Room Nurse (ORN)",
      email: "TechInnovations@gmail.com",
      phone: "+1 30546 025456",
      posted: 8,
      applicants: 8,
    },
  ];

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
            placeholder="Search Jobs"
            className="border border-gray-300 rounded-md pl-10 pr-3 py-2 w-[230px] text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* TABLE */}
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 text-sm text-gray-500 font-medium">
              Poster / Company
            </th>
            <th className="py-3 text-sm text-gray-500 font-medium">Contact</th>
            <th className="py-3 text-sm text-gray-500 font-medium">
              Posted Jobs
            </th>
            <th className="py-3 text-sm text-gray-500 font-medium">
              Total Applicants
            </th>
            <th className="py-3 text-sm text-gray-500 font-medium">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="py-4 text-[15px] text-gray-900">{item.title}</td>

              <td className="py-4">
                <p className="text-gray-900">{item.email}</p>
                <p className="text-xs text-gray-500">{item.phone}</p>
              </td>

              <td className="py-4 text-gray-900">{item.posted}</td>

              <td className="py-4 text-gray-900">{item.applicants}</td>

              <td className="py-4">
                <div className="flex items-center gap-4">
                  <button className="text-[#0097B2] text-sm hover:underline">
                    View Profile
                  </button>

                  <FiChevronRight className="text-gray-600 text-lg cursor-pointer hover:text-black" />
                  <FiTrash2 className="text-gray-600 text-lg cursor-pointer hover:text-red-600" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <button className="px-3 py-1 rounded-md border border-gray-300 text-sm hover:bg-gray-100">
          Previous
        </button>

        {[1, 2, 3, 4, 5, 6].map((num) => (
          <button
            key={num}
            className={`px-3 py-1 text-sm rounded-md border ${
              num === 1
                ? "bg-black text-white border-black"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {num}
          </button>
        ))}

        <button className="px-3 py-1 rounded-md border border-gray-300 text-sm hover:bg-gray-100">
          Next
        </button>
      </div>
    </div>
  );
}
