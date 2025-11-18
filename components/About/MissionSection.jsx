import React from "react";
import { FiUser, FiShield, FiTrendingUp } from "react-icons/fi";

const MissionSection = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP ROW */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          
          {/* LEFT TITLE */}
          <h2 className="text-[28px] md:text-[30px] font-semibold text-[#2C3E50]">
            Our Mission
          </h2>

          {/* RIGHT PARAGRAPH */}
          <p className="text-gray-600 text-[15px] max-w-xl leading-relaxed mt-4 md:mt-0">
            Our mission is to bridge the gap between talent and opportunity, 
            helping professionals find meaningful work while empowering 
            organizations to grow with confidence.
          </p>

        </div>

        {/* CARDS CONTAINER */}
        <div className="relative w-full border border-gray-300 border-dashed">

          {/* Vertical dashed dividers (Desktop only) */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/3 border-r border-gray-300 border-dashed"></div>
          <div className="hidden md:block absolute top-0 bottom-0 left-2/3 border-r border-gray-300 border-dashed"></div>

          {/* 3 COLUMN WRAPPER */}
          <div className="flex flex-col md:flex-row">

            {/* CARD 1 */}
            <div className="w-full md:w-1/3 p-10">
              <div className="w-12 h-12 bg-[#E6F9FD] rounded-full flex items-center justify-center mb-6">
                <FiUser className="text-[#00A8B5] text-xl" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                People—at the Heart
              </h3>

              <p className="text-gray-600 text-[15px] leading-relaxed">
                At VIVD, we believe every great business begins with the right people. 
                We don’t just match résumés—we connect ambition with opportunity, 
                helping individuals grow and companies thrive.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="w-full md:w-1/3 p-10">
              <div className="w-12 h-12 bg-[#E6F9FD] rounded-full flex items-center justify-center mb-6">
                <FiShield className="text-[#00A8B5] text-xl" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Purpose in Every Partnership
              </h3>

              <p className="text-gray-600 text-[15px] leading-relaxed">
                Each collaboration is built on trust, transparency, and shared purpose. 
                Whether you’re hiring or seeking your next role, we’re committed to making 
                the process personal and meaningful.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="w-full md:w-1/3 p-10">
              <div className="w-12 h-12 bg-[#E6F9FD] rounded-full flex items-center justify-center mb-6">
                <FiTrendingUp className="text-[#00A8B5] text-xl" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Expertise That Delivers
              </h3>

              <p className="text-gray-600 text-[15px] leading-relaxed">
                From healthcare to IT administration to construction—our industry insight 
                ensures every placement fits both the role and the culture. We go beyond 
                recruitment to build long-term success stories.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default MissionSection;
