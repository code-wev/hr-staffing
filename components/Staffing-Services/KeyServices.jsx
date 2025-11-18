import React from "react";
import { FiUserCheck, FiActivity, FiClipboard, FiShield } from "react-icons/fi";

const KeyServices = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-10">
          <h2 className="text-[26px] md:text-[28px] font-semibold text-[#2C3E50]">
            Our Key Services
          </h2>

          <p className="text-gray-600 text-[15px] max-w-lg mt-3 md:mt-0">
            Here are the core staffing services we offer, each designed to fit varied
            business needs and talent journeys.
          </p>
        </div>

        {/* SERVICES BOX */}
        <div className="relative border border-gray-300 border-dashed w-full">

          {/* ABSOLUTE VERTICAL DIVIDERS */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/4 border-r border-gray-300 border-dashed"></div>
          <div className="hidden md:block absolute top-0 bottom-0 left-2/4 border-r border-gray-300 border-dashed"></div>
          <div className="hidden md:block absolute top-0 bottom-0 left-3/4 border-r border-gray-300 border-dashed"></div>

          {/* 4-COLUMN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-4">

            {/* 1 — Temporary-to-Hire Associates */}
            <div className="p-8">
              <div className="w-12 h-12 bg-[#E6F9FD] rounded-full flex items-center justify-center mb-5">
                <FiUserCheck className="text-[#00A8B5] text-xl" />
              </div>

              <h3 className="text-[17px] font-semibold mb-3">Temporary-to-Hire Associates</h3>

              <p className="text-gray-600 text-[14px] leading-relaxed">
                Hire with confidence: we place pre-screened professionals who join
                your team on a short-term basis. If the fit is strong, you bring them
                onboard permanently — no surprises.
              </p>
            </div>

            {/* 2 — Temporary Associates */}
            <div className="p-8">
              <div className="w-12 h-12 bg-[#E6F9FD] rounded-full flex items-center justify-center mb-5">
                <FiActivity className="text-[#00A8B5] text-xl" />
              </div>

              <h3 className="text-[17px] font-semibold mb-3">Temporary Associates</h3>

              <p className="text-gray-600 text-[14px] leading-relaxed">
                Need flexible staffing to handle peaks, special projects, seasonal work
                or rapid scale-ups? We supply the talent — and manage payroll,
                onboarding, and performance oversight so you stay focused on business.
              </p>
            </div>

            {/* 3 — Permanent Associates */}
            <div className="p-8">
              <div className="w-12 h-12 bg-[#E6F9FD] rounded-full flex items-center justify-center mb-5">
                <FiClipboard className="text-[#00A8B5] text-xl" />
              </div>

              <h3 className="text-[17px] font-semibold mb-3">Permanent Associates</h3>

              <p className="text-gray-600 text-[14px] leading-relaxed">
                Find your long-term talent the right way: we blend market insight,
                culture fit, and rigorous screening so you hire not just for today, but
                for tomorrow. We guide you through negotiation, benefits and
                onboarding.
              </p>
            </div>

            {/* 4 — Safety & Compliance */}
            <div className="p-8">
              <div className="w-12 h-12 bg-[#E6F9FD] rounded-full flex items-center justify-center mb-5">
                <FiShield className="text-[#00A8B5] text-xl" />
              </div>

              <h3 className="text-[17px] font-semibold mb-3">Safety & Compliance Programs</h3>

              <p className="text-gray-600 text-[14px] leading-relaxed">
                We don’t stop at staffing. VIVD supports your workforce with safety
                frameworks, training and compliance resources so your team is protected,
                productive and aligned with industry standards.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default KeyServices;
