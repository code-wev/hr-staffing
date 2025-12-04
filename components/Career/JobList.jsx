"use client";
import { useAppliedMutation } from "@/feature/ApplicatonApi";
import { useAllJobQuery } from "@/feature/JobApi";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiArrowUpRight, FiX } from "react-icons/fi";

const JobList = () => {
  const { data, isLoading, error } = useAllJobQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);
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

  console.log(user?.user?.email, "aso na");
  const email = user?.user?.email;
  const [applied, { isLoading: appliedLoading, error: appliedError }] =
    useAppliedMutation();

  // Format department to category-like display
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
      department.charAt(0).toUpperCase() + department.slice(1)
    );
  };

  // Handle Apply button click
  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
    // Reset form data
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare application data according to your schema
    const applicationData = {
      applicant: email, // Using email as applicant identifier
      job: selectedJob._id,
      
jobPoster:selectedJob.jobPoster,
      cv: formData.cv || formData.sharedFileLink, // Using CV field or shared file link
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

    // Log to console
    console.log("Application Data (following schema):", applicationData);

    try {
      await applied(applicationData);
      toast.success("Applied successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    } finally {
      setShowModal(false);
    }

    // Show success message
    alert("Application submitted successfully! Check console for data.");

    // Here you would typically send to your API
    // Example API call:
    /*
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });
      
      if (response.ok) {
        toast.success("Application submitted successfully!");
      } else {
        toast.error("Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("An error occurred");
    }
    */

    // Close modal
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  // Get current jobs
  const allJobs = data?.data || [];
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = allJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(allJobs.length / jobsPerPage);

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 4;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 1) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber === "..." || pageNumber === currentPage) return;
    setCurrentPage(pageNumber);
  };

  // Reset to page 1 when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  if (isLoading) {
    return (
      <section className="w-full bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center text-red-500 py-12">
            Error loading jobs. Please try again.
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="w-full bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Toaster />
          {/* MOBILE/TABLET SCROLL ONLY */}
          <div className="overflow-x-auto lg:overflow-visible">
            {currentJobs.length > 0 ? (
              <table className="w-full border-collapse">
                <tbody>
                  {currentJobs.map((job) => (
                    <tr key={job._id} className="border-b border-gray-200">
                      {/* TITLE & REQ ID — LG NORMAL / MD/SM NO WRAP */}
                      <td className="py-6 w-1/4 align-top lg:whitespace-normal whitespace-nowrap md:min-w-[240px]">
                        <h3 className="font-medium text-[16px] text-gray-900 whitespace-inherit">
                          {job.jobTitle}
                        </h3>
                        <p className="text-gray-500 text-[16px] mt-1 whitespace-inherit">
                          Req ID: {job._id.slice(-8).toUpperCase()}
                        </p>
                      </td>

                      {/* LOCATION & COMPANY — LG NORMAL / MD-SM NO WRAP */}
                      <td className="py-6 w-1/2 align-top lg:whitespace-normal whitespace-nowrap md:min-w-[460px]">
                        <p className="text-gray-800 font-medium text-[16px] mb-1 whitespace-inherit">
                          Location
                        </p>
                        <p className="text-gray-600 text-[16px] leading-relaxed whitespace-inherit">
                          {job.location || "Location not specified"}
                        </p>
                      </td>

                      {/* CATEGORY & TYPE + BUTTON */}
                      <td className="py-6 w-1/4 align-top lg:whitespace-normal whitespace-nowrap md:min-w-[260px]">
                        <div className="flex items-start justify-between whitespace-nowrap">
                          <div>
                            <p className="text-gray-800 font-medium text-[16px] mb-1 whitespace-inherit">
                              Categories
                            </p>
                            <p className="text-gray-600 text-[16px] mb-3 whitespace-inherit">
                              {formatCategory(job.department)}
                            </p>
                          </div>

                          <button
                            onClick={() => handleApplyClick(job)}
                            className="bg-[#0497AE] text-white flex items-center gap-1 px-4 py-2 rounded-full text-[16px] shadow hover:bg-[#037e92] transition mt-3 whitespace-nowrap"
                          >
                            Apply <FiArrowUpRight />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No jobs available at the moment.
              </div>
            )}
          </div>

          {/* PAGINATION - Only show if there are jobs */}
          {allJobs.length > 0 && (
            <div className="flex justify-center mt-8 gap-2 text-sm">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                  currentPage === 1
                    ? "border-gray-300 text-gray-400 cursor-not-allowed"
                    : "border-gray-400 text-gray-700 hover:bg-gray-50"
                }`}
              >
                ←
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((pageNum, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={pageNum === "..."}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    pageNum === currentPage
                      ? "border border-gray-400 bg-gray-100 text-gray-700 font-medium"
                      : pageNum === "..."
                      ? "text-gray-500 cursor-default"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                  currentPage === totalPages
                    ? "border-gray-300 text-gray-400 cursor-not-allowed"
                    : "border-gray-400 text-gray-700 hover:bg-gray-50"
                }`}
              >
                →
              </button>
            </div>
          )}

          {/* Page Info */}
          {allJobs.length > 0 && (
            <div className="text-center text-gray-500 text-sm mt-4">
              Showing {indexOfFirstJob + 1} to{" "}
              {Math.min(indexOfLastJob, allJobs.length)} of {allJobs.length}{" "}
              jobs
            </div>
          )}
        </div>
      </section>

      {/* Apply Modal */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%] max-h-[90vh] overflow-y-auto shadow-lg">
            {/* Header with close button */}

            {/* Main content - split layout */}
            <div className="flex flex-col lg:flex-row">
              {/* Left side - Job details */}
              <div className="bg-[#2A3233] text-white px-8 py-6 lg:w-1/2">
                {/* Job Title */}
                <h4 className="text-2xl font-semibold mb-2">
                  {selectedJob.jobTitle}
                </h4>

                {/* Location */}
                <p className="text-sm leading-6 text-gray-200 mb-6">
                  {selectedJob.location || "Location not specified"}
                </p>

                {/* Qualification */}
                <h5 className="text-lg font-semibold mt-6 mb-2">
                  Qualification
                </h5>

                <ul className="space-y-2 text-sm text-gray-200 mb-6">
                  <li>• Logistics Experience Minimum (2) Years</li>
                  <li>• Google Sheets/Excel-(10 Year</li>
                  <li>• Shipping & Receiving</li>
                  <li>• Supervisory Experience Of 10+ People</li>
                  <li>• Bilingual Spanish Is A Plus</li>
                  <li>• Ability to Handle Physical Workload</li>
                  <li>• Strong Work Ethics</li>
                </ul>

                {/* Responsibilities */}
                <h5 className="text-lg font-semibold mt-6 mb-2">
                  Responsibilities
                </h5>

                <ul className="space-y-2 text-sm text-gray-200">
                  <li>• Supervising Employees Evaluating Their Performance</li>
                  <li>• Meeting Safety Regulations</li>
                  <li>• Monitoring Deliveries and Shipments</li>
                </ul>

                {/* Additional Job Info */}
                <div className="mt-8 pt-6 border-t border-gray-600">
                  <h5 className="text-lg font-semibold mb-3">Job Details</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Company</p>
                      <p className="font-medium">{selectedJob.companyName}</p>
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

              {/* Right side - Application form */}
              <div className="p-6 max-h-full overflow-y-scroll lg:w-1/2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative p-6">
                    <button
                      onClick={closeModal}
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

                  {/* First Name */}
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
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {/* Last Name */}
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
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                      required
                      readOnly
                      placeholder="your.email@example.com"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {/* Phone */}
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
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {/* Expected Salary */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expected Salary (Optional)
                    </label>
                    <input
                      type="number"
                      name="expectedSalary"
                      value={formData.expectedSalary}
                      onChange={handleInputChange}
                      placeholder="e.g., 50000"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div> */}

                  {/* CV Upload/URL */}
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
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Or use the shared file link field below
                    </p>
                  </div>

                  {/* Shared File Link */}
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
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {/* Cover Letter */}
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
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#0497AE] hover:bg-[#037e92] text-white py-3 rounded-md text-sm font-medium transition-colors"
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
