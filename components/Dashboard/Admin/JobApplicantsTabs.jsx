"use client";

import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

const applicants = [
  {
    name: "Saad Rayhan",
    email: "NextGenTech@icloud.com",
    phone: "+1 61234 098765",
    date: "04/01/2025",
    status: "Interview scheduled",
  },
  {
    name: "Maya Johnson",
    email: "TechInnovations@gmail.com",
    phone: "+1 30546 025456",
    date: "05/01/2025",
    status: "Under Review",
  },
  {
    name: "Liam Chen",
    email: "CreativeSolutions@yahoo.com",
    phone: "+1 41578 029876",
    date: "06/01/2025",
    status: "Interview scheduled",
  },
  {
    name: "Aisha Patel",
    email: "SmartDevelopers@aol.com",
    phone: "+1 71890 123456",
    date: "07/01/2025",
    status: "Screening",
  },
  {
    name: "Noah Smith",
    email: "FutureDesigns@outlook.com",
    phone: "+1 20234 057612",
    date: "08/01/2025",
    status: "Under Review",
  },
  {
    name: "Emma Garcia",
    email: "InnovateToday@live.com",
    phone: "+1 91765 432109",
    date: "09/01/2025",
    status: "Interview scheduled",
  },
  {
    name: "Oliver Brown",
    email: "TechInnovations@gmail.com",
    phone: "+1 30546 025456",
    date: "10/01/2025",
    status: "Under Review",
  },
];

const statusClasses = {
  "Interview scheduled": "bg-[#E5F3FF] text-[#1E88E5]",
  "Under Review": "bg-[#FFF4D9] text-[#B78300]",
  Screening: "bg-[#F3E6FF] text-[#7C3AED]",
};

export default function JobApplicantsTabs() {
  const [activeTab, setActiveTab] = useState("applicants");
  const [page, setPage] = useState(1); // ready for backend pagination later

  return (
    <div className="w-full bg-white px-8 py-6">
      {/* TITLE */}
      <h1 className="text-[22px] font-semibold text-gray-900 mb-2">
        Senior Frontend Developer
      </h1>

      {/* TABS */}
      <div className="border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab("applicants")}
          className={`mr-6 pb-3 text-sm ${
            activeTab === "applicants"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Applicants
        </button>
        <button
          onClick={() => setActiveTab("details")}
          className={`pb-3 text-sm ${
            activeTab === "details"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Job Details
        </button>
      </div>

      {activeTab === "applicants" ? (
        <>
          {/* APPLICANTS TABLE */}
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 text-gray-500 font-medium">Name</th>
                <th className="py-3 text-gray-500 font-medium">Contact</th>
                <th className="py-3 text-gray-500 font-medium">Apply date</th>
                <th className="py-3 text-gray-500 font-medium">Status</th>
                <th className="py-3 text-gray-500 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  {/* NAME + AVATAR */}
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[#F3F4F6] flex items-center justify-center text-xs font-semibold text-gray-700">
                        {item.name.charAt(0)}
                      </div>
                      <span className="text-gray-900 text-[13px]">
                        {item.name}
                      </span>
                    </div>
                  </td>

                  {/* CONTACT */}
                  <td className="py-3">
                    <p className="text-gray-900 text-[13px]">{item.email}</p>
                    <p className="text-gray-500 text-[11px]">{item.phone}</p>
                  </td>

                  {/* DATE */}
                  <td className="py-3 text-[13px] text-gray-900">
                    {item.date}
                  </td>

                  {/* STATUS BADGE */}
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center px-3 py-[3px] rounded-full text-[11px] font-medium ${
                        statusClasses[item.status]
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="py-3">
                    <button className="inline-flex items-center gap-2 text-[13px] text-[#1993FF] hover:underline">
                      <span>View candidate profile</span>
                      <FiArrowRight className="text-gray-500 text-sm" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex items-center justify-center gap-2 mt-6 text-sm">
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
              Previous
            </button>

            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`px-3 py-1 border rounded-md ${
                  page === n
                    ? "bg-black text-white border-black"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {n}
              </button>
            ))}

            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
              Next
            </button>
          </div>
        </>
      ) : (
        /* JOB DETAILS TAB */
        <div className="mt-4 text-sm text-gray-900">
          <h2 className="text-[18px] font-medium mb-1">Wearhouse lead</h2>
          <p className="text-[13px] text-gray-600 mb-6 max-w-3xl">
            Carson, Anaheim Fullerton, Fullerton, Buena Park, California, Long
            Beach, Santa Fe Springs, South Gate.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Qualification</h3>
              <ul className="list-disc list-inside space-y-1 text-[13px] text-gray-800">
                <li>Logistics Experience Minimum (2) Years</li>
                <li>Google Sheets/Excel- (10 Year)</li>
                <li>Shipping &amp; Receiving</li>
                <li>Supervisory Experience Of 10+ People</li>
                <li>Bilingual Spanish Is A Plus</li>
                <li>Ability to Handle Physical Workload</li>
                <li>Strong Work Ethics</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Responsibilities</h3>
              <ul className="list-disc list-inside space-y-1 text-[13px] text-gray-800">
                <li>Supervising Employees Evaluating Their Performance</li>
                <li>Meeting Safety Regulations</li>
                <li>Monitoring Deliveries and Shipments</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
