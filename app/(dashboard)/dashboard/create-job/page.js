"use client";
import { FiUploadCloud } from "react-icons/fi";
import { LuCalendar } from "react-icons/lu";

export default function CreateJobPost() {
  return (
    <div className="w-full min-h-screen bg-white px-6 py-8">
      {/* Page Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Create job post</h2>

      {/* ======================= GRID TOP ======================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Job Title */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            placeholder="e.g. Senior Frontend Developer"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Department */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Department</label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Please select your province and region</option>
          </select>
        </div>

        {/* Company Name */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            placeholder="Your company name.."
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Location</label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Please choose your zone</option>
          </select>
        </div>

        {/* Job Type */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Job Type</label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Select Job Type</option>
          </select>
        </div>

        {/* Pay Type */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Pay Type</label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Select Method</option>
          </select>
        </div>

        {/* Deadline */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Deadline</label>
          <div className="relative">
            <input
              type="text"
              placeholder="dd-mm-yyyy"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm pr-10 focus:outline-none"
            />
            <LuCalendar className="absolute right-3 top-2.5 text-gray-500" size={18} />
          </div>
        </div>
      </div>

      {/* ======================= JOB DESCRIPTION ======================= */}
      <div className="mt-8">
        <label className="text-sm text-gray-700 mb-1 block">Job Description</label>
        <textarea
          placeholder="Your company name..."
          className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none resize-none"
        ></textarea>
      </div>

      {/* ======================= PERKS SECTION ======================= */}
      <div className="mt-8">
        <label className="text-sm text-gray-700 mb-3 block">Company Perks</label>

        <div className="flex flex-wrap gap-3 text-sm">
          {[
            "Wellness services",
            "Access to wellness facilities",
            "Employee wellness programs",
            "Schedule & flexibility",
            "Part-time or full-time availability",
            "Remote or hybrid options",
            "Ability to set your own schedule",
            "Ability to set your own schedule",
            "Ability to set your own schedule",
            "Ability to set your own schedule",
          ].map((perk, i) => (
            <label
              key={i}
              className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 cursor-pointer"
            >
              <input type="checkbox" className="accent-black" />
              {perk}
            </label>
          ))}
        </div>
      </div>

      {/* ======================= UPLOAD FILE BOX ======================= */}
      <div className="mt-10">
        <label className="text-sm text-gray-700 mb-3 block">Upload File</label>

        <div className="w-full border border-dashed border-gray-300 rounded-xl py-14 flex flex-col items-center justify-center">
          <FiUploadCloud size={34} className="text-gray-600 mb-3" />
          <p className="text-sm text-gray-600">Click to upload file or drag and drop</p>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
        </div>
      </div>

      {/* ======================= BUTTONS ======================= */}
      <div className="mt-10 flex items-center justify-end gap-3">
        <button className="px-5 py-2 border border-gray-300 rounded-md text-sm">
          Discard
        </button>
        <button className="px-5 py-2 bg-[#0097B2] text-white rounded-md text-sm">
          Publish Job
        </button>
      </div>
    </div>
  );
}
