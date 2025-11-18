import React from "react";
import { FiUsers, FiSmile, FiMessageCircle } from "react-icons/fi";

const GetInTouch = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          {/* Left title */}
          <h2 className="text-[28px] md:text-[30px] font-semibold text-[#2C3E50]">
            Get in Touch
          </h2>

          {/* Right paragraph */}
          <p className="text-gray-600 max-w-xl text-[15px] leading-relaxed mt-4 md:mt-0">
            We’re dedicated to bridging the gap between skilled professionals and employers 
            seeking excellence. Our platform streamlines recruitment and empowers 
            applicants to showcase their talent.
          </p>
        </div>

        {/* MAIN CARDS WRAPPER */}
        <div className="relative border border-gray-300 border-dashed">

          {/* Vertical Dividers */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/3 border-r border-gray-300 border-dashed"></div>
          <div className="hidden md:block absolute top-0 bottom-0 left-2/3 border-r border-gray-300 border-dashed"></div>

          {/* Cards */}
          <div className="flex flex-col md:flex-row">

            {/* CARD 1 */}
            <div className="w-full md:w-1/3 p-10">
              <div className="w-12 h-12 rounded-full bg-[#E6F9FD] flex items-center justify-center mb-6">
                <FiUsers className="text-[#00A8B5] text-xl" />
              </div>
              <h3 className="text-[17px] font-semibold text-gray-900 mb-2">Need Talent?</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                Find skilled professionals ready to make an impact. We tailor staffing 
                solutions that fit your business.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="w-full md:w-1/3 p-10">
              <div className="w-12 h-12 rounded-full bg-[#E6F9FD] flex items-center justify-center mb-6">
                <FiSmile className="text-[#00A8B5] text-xl" />
              </div>
              <h3 className="text-[17px] font-semibold text-gray-900 mb-2">Looking for a Job?</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                Explore open roles that fit your goals and get guidance from our 
                recruitment specialists.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="w-full md:w-1/3 p-10">
              <div className="w-12 h-12 rounded-full bg-[#E6F9FD] flex items-center justify-center mb-6">
                <FiMessageCircle className="text-[#00A8B5] text-xl" />
              </div>
              <h3 className="text-[17px] font-semibold text-gray-900 mb-2">Have a Question?</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                We’re here to help — reach out for partnerships, feedback, or any general queries.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default GetInTouch;
