import React from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

const WhyChooseUs = () => {
  return (
    <section className="w-full h-auto md:h-[580px] bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">

        {/* LEFT GRAY PANEL */}
        <div className="bg-[#707070] flex items-center px-10 md:px-20 py-16 md:py-0">
          <div className="text-white ">

            {/* Heading */}
            <h2 className="text-[26px] md:text-[32px] font-semibold mb-16">
              Why Choose Us
            </h2>

            {/* Bullet List */}
            <ul className="space-y-3 text-[16px]">
              <li>• Deep industry knowledge and a network of trusted professionals.</li>
              <li>
                • A people-first approach: we match culture and ambition, not just credentials.
              </li>
              <li>
                • Transparent, ethical practices built on integrity and trust.
              </li>
              <li>
                • End-to-end service: from recruitment to payroll and onboarding, we’ve got it covered.
              </li>
            </ul>

            {/* Button */}
            <button className="mt-8 bg-white text-gray-800 px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-gray-100 transition">
              Connect With Us <FiArrowUpRight className="text-[16px]" />
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative h-[300px] md:h-full w-full">
          <Image
            src="/Home/purpose.jpg"  
            alt="Why Choose Us"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
