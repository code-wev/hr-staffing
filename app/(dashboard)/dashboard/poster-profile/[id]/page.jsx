"use client";

import { useMyJobQuery, useSingleUserQuery } from "@/feature/JobApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiPhone, FiMail, FiMapPin, FiArrowRight } from "react-icons/fi";

export default function PosterProfilepage() {
  const { id } = useParams();
  const { data: allJob, isLoading } = useMyJobQuery(id);
  const { data: user } = useSingleUserQuery(id);

  const profile = user?.data?.[0] || {};
  const jobs = allJob?.data || [];

  return (
    <div className=" mx-auto pb-16">

      {/* ======================= HEADER SECTION ======================= */}
      <div className="bg-[#F5F5F5] py-20 text-center ">
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
      <h2 className="text-[20px] font-semibold mt-10 mb-4">Created Jobs</h2>

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
            {jobs.map((job) => (
              <tr key={job._id} className="border-b border-gray-200 hover:bg-gray-50 transition">

                {/* Job Title */}
                <td className="py-4">{job.jobTitle}</td>

                {/* Applicants Count (Dynamic Placeholder for now) */}
  

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
               <Link href={`/dashboard/my-jobs/${job?._idM}`}>
                  <button className="flex items-center gap-2 text-[#0097B2] hover:underline">
                    View details <FiArrowRight size={16} />
                  </button></Link>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
