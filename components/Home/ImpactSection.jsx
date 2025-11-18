import React from "react";
import { FiUsers, FiShare2, FiGrid } from "react-icons/fi";

const ImpactSection = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Text */}
        <div className="flex-row md:flex justify-between items-start mb-12">
          <h2 className="text-[32px] mb-5 md:mb-0 font-semibold text-[#2C3E50]">
            Connecting People, <br /> Creating Impact.
          </h2>

          <p className="text-gray-600 max-w-xl text-[16px]">
            We’re dedicated to bridging the gap between skilled professionals and employers
            seeking excellence. Our platform streamlines recruitment and empowers
            applicants to showcase their talent.
          </p>
        </div>

        {/* Main Wrapper - ONE BOX */}
        <div className="relative border border-gray-300 border-dashed p-0">

          {/* Absolute Vertical Dividers */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/3 border-r border-gray-300 border-dashed"></div>
          <div className="hidden md:block absolute top-0 bottom-0 left-2/3 border-r border-gray-300 border-dashed"></div>

          {/* Flex 3 Columns */}
          <div className="flex flex-col md:flex-row">

            {/* Column 1 */}
            <div className="w-full md:w-1/3 p-10">
              <div className="w-14 h-14 bg-[#E6F9FD] rounded-full flex items-center justify-center mb-6">
                <FiUsers className="text-[#00A8B5] text-2xl" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Personalized Job Matches
              </h3>

              <p className="text-gray-600 text-[15px] leading-relaxed">
                We understand your goals and connect you with positions that truly
                align with your skills and ambitions.
              </p>
            </div>

            {/* Column 2 */}
            <div className="w-full md:w-1/3 p-10">
              <div className="w-14 h-14 bg-[#E6F9FD] rounded-full flex items-center justify-center mb-6">
                <FiShare2 className="text-[#00A8B5] text-2xl" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Trusted Employer Network
              </h3>

              <p className="text-gray-600 text-[15px] leading-relaxed">
                Partnered with leading companies across industries to bring you
                meaningful, long-term opportunities.
              </p>
            </div>

            {/* Column 3 */}
            <div className="w-full md:w-1/3 p-10">
              <div className="w-14 h-14 bg-[#E6F9FD] rounded-full flex items-center justify-center mb-6">
                <FiGrid className="text-[#00A8B5] text-2xl" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Support at Every Step
              </h3>

              <p className="text-gray-600 text-[15px] leading-relaxed">
                From your first interview to your first day on the job, our team is
                here to guide and support you.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ImpactSection;
