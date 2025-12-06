"use client";
import { useAppliedMutation } from "@/feature/ApplicatonApi";
import { useAllJobQuery } from "@/feature/JobApi";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiArrowUpRight, FiX } from "react-icons/fi";

const JobList = ({
  searchText = "",
  searchLocation = "",
  searchCategory = "",
}) => {
  const { data, isLoading, error } = useAllJobQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cv: "",
    coverLetter: "",
    expectedSalary: "",
    sharedFileLink: "",
  });

  const { data: user } = useSession();
  const email = user?.user?.email;

  const [applied] = useAppliedMutation();

  const formatCategory = (department) => {
    const categoryMap = {
      engineering: "Engineering",
      hr: "Human Resources",
      sales: "Sales",
      marketing: "Marketing",
      operations: "Operations",
      finance: "Finance",
      management: "Management",
    };
    return (
      categoryMap[department] ||
      department?.charAt(0).toUpperCase() + department?.slice(1)
    );
  };

  // ======================================
  // 🔥 LOGIN CHECK + OPEN MODAL 
  // ======================================
  const handleApplyClick = (job) => {
    if (!email) {
      toast.error("Please login first to apply.");
      window.location.href = "/auth/signin";
      return;
    }

    setSelectedJob(job);
    setShowModal(true);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      cv: "",
      coverLetter: "",
      expectedSalary: "",
      sharedFileLink: "",
    });
  };

  const handleInputChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicationData = {
      applicant: email,
      job: selectedJob._id,
      jobPoster: selectedJob.jobPoster,
      cv: formData.cv || formData.sharedFileLink,
      coverLetter: formData.coverLetter,
      phoneNumber: formData.phone,
      expectedSalary: formData.expectedSalary
        ? Number(formData.expectedSalary)
        : null,
      phone: formData.phone,
      firstName: formData.firstName,
      lastName: formData.lastName,
      applicationStatus: "pending",
      appliedAt: new Date().toISOString(),
    };

    try {
      await applied(applicationData);
      toast.success("Applied successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    } finally {
      setShowModal(false);
    }
  };

  // ======================================
  // 🔥 SEARCH FILTERING (NO DESIGN CHANGE)
  // ======================================
  const allJobs = data?.data || [];

  const filteredJobs = allJobs.filter((job) => {
    const matchTitle = job.jobTitle
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    const matchLocation = (job.location || "")
      .toLowerCase()
      .includes(searchLocation.toLowerCase());

    const matchCategory = (job.department || "")
      .toLowerCase()
      .includes(searchCategory.toLowerCase());

    return (
      (searchText ? matchTitle : true) &&
      (searchLocation ? matchLocation : true) &&
      (searchCategory ? matchCategory : true)
    );
  });

  // ======================================
  // 🔥 PAGINATION (UNCHANGED)
  // ======================================
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  useEffect(() => setCurrentPage(1), [
    searchText,
    searchLocation,
    searchCategory,
  ]);

  const getPageNumbers = () => {
    const pages = [];
    const max = 4;

    if (totalPages <= max) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  if (isLoading)
    return <p className="text-center py-12">Loading jobs...</p>;

  if (error)
    return (
      <p className="text-center py-12 text-red-500">
        Error loading jobs.
      </p>
    );

  return (
    <>
      <section className="w-full bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Toaster />

          {/* TABLE (UNCHANGED) */}
          <div className="overflow-x-auto lg:overflow-visible">
            {currentJobs.length > 0 ? (
              <table className="w-full border-collapse">
                <tbody>
                  {currentJobs.map((job) => (
                    <tr key={job._id} className="border-b border-gray-200">
                      <td className="py-6 w-1/4">
                        <h3 className="font-medium text-[16px]">
                          {job.jobTitle}
                        </h3>
                        <p className="text-gray-500 text-[16px] mt-1">
                          Req ID: {job._id.slice(-8).toUpperCase()}
                        </p>
                      </td>

                      <td className="py-6 w-1/2">
                        <p className="font-medium text-[16px]">
                          Location
                        </p>
                        <p className="text-gray-600 text-[16px]">
                          {job.location || "Location not specified"}
                        </p>
                      </td>

                      <td className="py-6 w-1/4">
                        <p className="font-medium text-[16px]">
                          Categories
                        </p>
                        <p className="text-gray-600 text-[16px] mb-3">
                          {formatCategory(job.department)}
                        </p>

                        <button
                          onClick={() => handleApplyClick(job)}
                          className="bg-[#0497AE] text-white px-4 py-2 rounded-full text-[16px] flex items-center gap-1 shadow mt-3"
                        >
                          Apply <FiArrowUpRight />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-12 text-gray-500">
                No jobs found matching your search.
              </p>
            )}
          </div>

          {/* PAGINATION (UNCHANGED) */}
          {filteredJobs.length > 0 && (
            <div className="flex justify-center mt-8 gap-2 text-sm">
              <button
                onClick={() =>
                  currentPage > 1 && setCurrentPage(currentPage - 1)
                }
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400"
              >
                ←
              </button>

              {getPageNumbers().map((num, i) => (
                <button
                  key={i}
                  onClick={() =>
                    num !== "..." && setCurrentPage(num)
                  }
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    num === currentPage
                      ? "bg-gray-200 border border-gray-400"
                      : num === "..."
                      ? "cursor-default text-gray-400"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() =>
                  currentPage < totalPages &&
                  setCurrentPage(currentPage + 1)
                }
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400"
              >
                →
              </button>
            </div>
          )}
        </div>
      </section>


      {/* 🔥 MODAL 🔥 */}
   
      {showModal && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%] max-h-[90vh] overflow-y-auto shadow-lg">
            <div className="flex flex-col lg:flex-row">
              
              {/* LEFT SECTION */}
              <div className="bg-[#2A3233] text-white px-8 py-6 lg:w-1/2">
                <h4 className="text-2xl font-semibold mb-2">
                  {selectedJob.jobTitle}
                </h4>

                <p className="text-sm leading-6 text-gray-200 mb-6">
                  {selectedJob.location || "Location not specified"}
                </p>

                <h5 className="text-lg font-semibold mt-6 mb-2">
                  Qualification
                </h5>

                <ul className="space-y-2 text-sm text-gray-200 mb-6">
                  <li>• Logistics Experience Minimum (2) Years</li>
                  <li>• Google Sheets/Excel (10 Years)</li>
                  <li>• Shipping & Receiving</li>
                  <li>• Supervisory Experience Of 10+ People</li>
                  <li>• Strong Work Ethics</li>
                </ul>

                <h5 className="text-lg font-semibold mt-6 mb-2">
                  Responsibilities
                </h5>

                <ul className="space-y-2 text-sm text-gray-200">
                  <li>• Supervising Employees</li>
                  <li>• Meeting Safety Regulations</li>
                  <li>• Monitoring Deliveries & Shipments</li>
                </ul>

                <div className="mt-8 pt-6 border-t border-gray-600">
                  <h5 className="text-lg font-semibold mb-3">Job Details</h5>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Company</p>
                      <p className="font-medium">
                        {selectedJob.companyName}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">Department</p>
                      <p className="font-medium">
                        {formatCategory(selectedJob.department)}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">Job Type</p>
                      <p className="font-medium capitalize">
                        {selectedJob.jobType}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">Pay Type</p>
                      <p className="font-medium capitalize">
                        {selectedJob.payType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SECTION — FORM EXACT SAME */}
              <div className="p-6 max-h-full overflow-y-scroll lg:w-1/2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative p-6">
                    <button
                      onClick={() => setShowModal(false)}
                      className="absolute right-6 top-6 text-gray-500 hover:text-gray-700"
                    >
                      <FiX size={24} />
                    </button>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Application Form
                  </h2>

                  <p className="text-gray-600 text-sm mb-6">
                    Fill out the form below to apply for this position
                  </p>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your first name"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your last name"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+1 (555) 123-4567"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CV / Resume URL *
                    </label>
                    <input
                      type="url"
                      name="cv"
                      value={formData.cv}
                      onChange={handleInputChange}
                      required
                      placeholder="https://drive.google.com/your-resume.pdf"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Or use the shared file link field below
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Share file (Alternative)
                    </label>
                    <input
                      type="url"
                      name="sharedFileLink"
                      value={formData.sharedFileLink}
                      onChange={handleInputChange}
                      placeholder="Paste file link (Drive, Dropbox, etc.)"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Letter (Optional)
                    </label>
                    <textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Tell us why you're interested in this position..."
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0497AE] hover:bg-[#037e92] text-white py-3 rounded-md text-sm"
                  >
                    Apply
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobList;
