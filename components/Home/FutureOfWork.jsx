import React from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const FutureOfWork = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-3xl mx-auto text-center px-6">

        {/* Heading */}
        <h2 className="text-2xl md:text-[32px] font-semibold text-[#333333] mb-3">
          Let’s Build the Future of Work — Together.
        </h2>

        {/* Description */}
        <p className="text-[#737373] max-w-[514px] mx-auto text-[16px] leading-relaxed mb-8">
          We believe in meaningful connections that create lasting impact. Join our
          network of talented professionals and employers shaping the future of
          work.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">

          {/* Blue Button */}
          <Link
            href="/find-job"
            className="bg-[#0497AE] text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 shadow hover:bg-[#03889c] transition"
          >
            Find A Job <FiArrowUpRight className="text-[16px]" />
          </Link>

          {/* White Button */}
          <Link
            href="/hire-talent"
            className="bg-white border border-gray-400 text-gray-800 px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-gray-100 transition"
          >
            Hire A Talent <FiArrowUpRight className="text-[16px]" />
          </Link>

        </div>

      </div>
    </section>
  );
};

export default FutureOfWork;
