"use client";

import {
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiUsers,
  FiUserCheck,
  FiGrid,
} from "react-icons/fi";

export default function ApplicantDashboard() {
  return (
    <div className="w-full bg-white min-h-screen">
      {/* ================= STAT CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* CARD 1 */}
        <div className="bg-[#F7F7F7] px-6 py-5 relative">
          <FiUsers className="absolute right-5 top-4 text-[#6F6F6F] text-[18px]" />
          <p className="text-[14px] text-[#4C4C4C] mb-1">Total Job Posted</p>
          <p className="text-[28px] font-semibold text-black leading-none">
            24
          </p>
        </div>

        {/* CARD 2 */}
        <div className="bg-[#F7F7F7] px-6 py-5 relative">
          <FiUserCheck className="absolute right-5 top-4 text-[#6F6F6F] text-[18px]" />
          <p className="text-[14px] text-[#4C4C4C] mb-1">Active jobs</p>
          <p className="text-[28px] font-semibold text-black leading-none">
            18
          </p>
        </div>

        {/* CARD 3 */}
        <div className="bg-[#F7F7F7] px-6 py-5 relative">
          <FiGrid className="absolute right-5 top-4 text-[#6F6F6F] text-[18px]" />
          <p className="text-[14px] text-[#4C4C4C] mb-1">Total Applicants</p>
          <p className="text-[28px] font-semibold text-black leading-none">
            156
          </p>
        </div>
      </div>

      {/* ================= TITLE + SEARCH ================= */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[22px] font-semibold text-[#111]">
          Latest posted jobs
        </h2>

        <div className="relative">
          <input
            type="text"
            placeholder="Search Jobs"
            className="w-[170px] md:w-[230px] text-[13px] border border-[#D9D9D9] rounded-md px-3 py-2 outline-none"
          />
          <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[15px] text-[#7E7E7E]" />
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-[#EAEAEA] text-[#6B6B6B]">
              <th className="text-left py-3 font-medium">Job Post</th>
              <th className="text-left py-3 font-medium">Category</th>
              <th className="text-left py-3 font-medium">Status</th>
              <th className="text-left py-3 font-medium">Job type</th>
              <th className="text-left py-3 font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="text-[#222]">
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-[#F1F1F1] hover:bg-[#FAFAFA] transition"
              >
                <td className="py-4">{row.title}</td>
                <td className="py-4 text-[#555]">{row.category}</td>

                <td className="py-4">
                  <span
                    className={`px-3 py-[3px] text-[12px] rounded-md ${
                      row.status === "Active"
                        ? "bg-[#E5F8EC] text-[#2EB872]"
                        : "bg-[#FDECEC] text-[#E05454]"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>

                <td className="py-4 text-[#555]">{row.type}</td>

                <td className="py-4">
                  <div className="flex items-center gap-4">
                    <FiEdit2 className="text-[16px] text-[#333] cursor-pointer hover:text-black" />
                    <FiTrash2 className="text-[16px] text-[#333] cursor-pointer hover:text-black" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex items-center justify-center gap-4 mt-10">
        <button className="text-sm text-[#7E7E7E]">Previous</button>

        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-md bg-[#111111] text-white text-sm">
            1
          </button>
          <button className="w-8 h-8 rounded-md text-[#555] text-sm hover:bg-gray-100">
            2
          </button>
          <button className="w-8 h-8 rounded-md text-[#555] text-sm hover:bg-gray-100">
            3
          </button>
          <button className="w-8 h-8 rounded-md text-[#555] text-sm hover:bg-gray-100">
            4
          </button>
          <button className="w-8 h-8 rounded-md text-[#555] text-sm hover:bg-gray-100">
            5
          </button>
          <button className="w-8 h-8 rounded-md text-[#555] text-sm hover:bg-gray-100">
            …
          </button>
        </div>
        <button className="text-sm text-[#7E7E7E]">Next</button>
      </div>
    </div>
  );
}

/* ================= TABLE DATA ================= */

const rows = [
  {
    title: "Frontend developer",
    category: "Engineering",
    status: "Active",
    type: "Full time",
  },
  {
    title: "Clinical Nurse Specialist (CNS)",
    category: "Sales",
    status: "Expired",
    type: "Part time",
  },
  {
    title: "Licensed Practical Nurse (LPN)",
    category: "Product Management",
    status: "Active",
    type: "Internship",
  },
  {
    title: "Pediatric Nurse Practitioner (PNP)",
    category: "Human Resources",
    status: "Expired",
    type: "Contract",
  },
  {
    title: "Nurse Practitioner (NP)",
    category: "Customer Support",
    status: "Active",
    type: "Freelance",
  },
  {
    title: "Registered Nurse (ER)",
    category: "Marketing",
    status: "Active",
    type: "Temporary",
  },
  {
    title: "Operating Room Nurse (ORN)",
    category: "Design",
    status: "Expired",
    type: "Remote",
  },
];
