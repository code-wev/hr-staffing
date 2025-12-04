"use client";
import { useSingleJobQuery, useUpdateJobMutation } from "@/feature/JobApi";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiUploadCloud } from "react-icons/fi";
import { LuCalendar } from "react-icons/lu";

const Editpage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading, error } = useSingleJobQuery(id);
  const jobData = data?.data;

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    companyName: "",
    location: "",
    jobType: "",
    payType: "",
    deadline: "",
    description: "",
    companyPerks: [],
  });

  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();

  // Set form data when job data is loaded
  useEffect(() => {
    if (jobData) {
      setFormData({
        jobTitle: jobData.jobTitle || "",
        department: jobData.department || "",
        companyName: jobData.companyName || "",
        location: jobData.location || "",
        jobType: jobData.jobType || "",
        payType: jobData.payType || "",
        deadline: jobData.deadline ? jobData.deadline.split("T")[0] : "",
        description: jobData.description || "",
        companyPerks: jobData.companyPerks || [],
      });
    }
  }, [jobData]);

  // ========== FILE UPLOAD HANDLER ==========
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ========== FORM INPUT CHANGE HANDLER ==========
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // ========== PERKS CHECKBOX HANDLER ==========
  const handlePerkChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          companyPerks: [...prev.companyPerks, value],
        };
      } else {
        return {
          ...prev,
          companyPerks: prev.companyPerks.filter((perk) => perk !== value),
        };
      }
    });
  };

  // ========== FORM SUBMIT HANDLER ==========
  const handleUpdateJob = async () => {
    try {
      let imageUrl = jobData?.uploadFile || "";

      // === Upload to imgBB only if new file selected ===
      if (file) {
        const formDataObj = new FormData();
        formDataObj.append("image", file);

        const uploadRes = await fetch(
          `https://api.imgbb.com/1/upload?key=b49a7cbd3d5227c273945bd7114783a9`,
          {
            method: "POST",
            body: formDataObj,
          }
        );

        const uploadData = await uploadRes.json();
        imageUrl = uploadData?.data?.url;
      }

      // === Prepare job data ===
      const updatedJobData = {
        ...formData,
        uploadFile: imageUrl,
        _id: id, // Include the job ID for update
      };

        await updateJob(updatedJobData);
      toast.success("Job updated successfully");

      // Redirect to my jobs page or stay on edit page
      router.push("/dashboard/my-jobs");

      console.log("UPDATED JOB DATA:", updatedJobData);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update job");
      console.error("Error updating job:", error);
    }
  };

  // ========== CANCEL BUTTON HANDLER ==========
  const handleCancel = () => {
    if (confirm("Are you sure you want to discard changes?")) {
      router.back();
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error || !jobData) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-500">
          Error loading job data. Please try again.
        </p>
      </div>
    );
  }

  // List of perks for checkbox
  const allPerks = [
    "Wellness services",
    "Access to wellness facilities",
    "Employee wellness programs",
    "Schedule & flexibility",
    "Part-time or full-time availability",
    "Remote or hybrid options",
    "Ability to set your own schedule",
  ];

  return (
    <div className="w-full min-h-screen bg-white px-6 py-8">
      <Toaster />
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Edit Job Post
      </h2>

      {/* ======================= GRID TOP ======================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Title */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Job Title</label>
          <input
            id="jobTitle"
            type="text"
            value={formData.jobTitle}
            onChange={handleInputChange}
            placeholder="e.g. Senior Frontend Developer"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Department */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Department</label>
          <select
            id="department"
            value={formData.department}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Please select department</option>
            <option value="engineering">Engineering</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
            <option value="hr">Human Resources</option>
            <option value="finance">Finance</option>
            <option value="operations">Operations</option>
          </select>
        </div>

        {/* Company Name */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Company Name</label>
          <input
            id="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="Your company name.."
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Location</label>
          <input
            id="location"
            type="text"
            placeholder="Enter location..."
            value={formData.location}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Job Type */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Job Type</label>
          <select
            id="jobType"
            value={formData.jobType}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select Job Type</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="remote">Remote</option>
          </select>
        </div>

        {/* Pay Type */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Pay Type</label>
          <select
            id="payType"
            value={formData.payType}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select Method</option>
            <option value="hourly">Hourly</option>
            <option value="monthly">Monthly</option>
            <option value="project">Project-based</option>
            <option value="commission">Commission</option>
          </select>
        </div>

        {/* Deadline */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Deadline</label>
          <div className="relative">
            <input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm pr-10 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <LuCalendar
              className="absolute right-3 top-2.5 text-gray-500 pointer-events-none"
              size={18}
            />
          </div>
        </div>
      </div>

      {/* ======================= JOB DESCRIPTION ======================= */}
      <div className="mt-8">
        <label className="text-sm text-gray-700 mb-1 block">
          Job Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe the job responsibilities, requirements, and expectations..."
          className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
        ></textarea>
      </div>

      {/* ======================= PERKS SECTION ======================= */}
      <div className="mt-8">
        <label className="text-sm text-gray-700 mb-3 block">
          Company Perks
        </label>

        <div className="flex flex-wrap gap-3 text-sm">
          {allPerks.map((perk, i) => (
            <label
              key={i}
              className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 cursor-pointer hover:border-blue-500 transition-colors"
            >
              <input
                type="checkbox"
                value={perk}
                onChange={handlePerkChange}
                className="perkCheck accent-[#0097B2]"
                checked={formData.companyPerks.includes(perk)}
              />
              {perk}
            </label>
          ))}
        </div>
      </div>

      {/* ======================= UPLOAD FILE BOX ======================= */}
      <div className="mt-10">
        <label className="text-sm text-gray-700 mb-3 block">Upload File</label>

        <div
          className={`w-full border border-dashed ${
            file || jobData?.uploadFile
              ? "border-[#0097B2] bg-blue-50"
              : "border-gray-300"
          } rounded-xl py-14 flex flex-col items-center justify-center cursor-pointer hover:border-[#0097B2] transition-colors`}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <FiUploadCloud
            size={34}
            className={`${
              file || jobData?.uploadFile ? "text-[#0097B2]" : "text-gray-600"
            } mb-3`}
          />
          <p className="text-sm text-gray-600">
            {file
              ? file.name
              : jobData?.uploadFile
              ? "Current file uploaded. Click to change"
              : "Click to upload file or drag and drop"}
          </p>
          {jobData?.uploadFile && !file && (
            <p className="text-xs text-green-600 mt-1">File already uploaded</p>
          )}
          <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
        </div>

        {jobData?.uploadFile && (
          <div className="mt-2 text-sm text-gray-600">
            Current file: {jobData.uploadFile.substring(0, 50)}...
          </div>
        )}

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* ======================= BUTTONS ======================= */}
      <div className="mt-10 flex items-center justify-end gap-3">
        <button
          onClick={handleCancel}
          className="px-5 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateJob}
          //   disabled={isUpdating}
          className="px-5 py-2 bg-[#0097B2] text-white rounded-md text-sm hover:bg-[#008199] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpdating ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Updating...
            </span>
          ) : (
            "Update Job"
          )}
        </button>
      </div>
    </div>
  );
};

export default Editpage;
