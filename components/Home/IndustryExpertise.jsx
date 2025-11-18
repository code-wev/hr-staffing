import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const IndustryExpertise = () => {
  return (
    <section className="relative w-full h-[450px] md:h-[650px] overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/Home/expertise.jpg"
        alt="Industry Expertise"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h2 className="text-white text-3xl md:text-[32px] font-semibold mb-3">
          Our Expertise Across Industries
        </h2>

        <div className="flex justify-center">
          <p className="text-gray-200 max-w-[400px] text-[16px] mb-6">
            Connecting qualified healthcare professionals with facilities that
            value excellence and compassion.
          </p>
        </div>

        <Link
          href="/services"
          className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-4 rounded-full text-sm font-medium shadow hover:bg-gray-100 transition"
        >
          What We Can Do For You? <FiArrowUpRight className="text-[16px]" />
        </Link>
      </div>
    </section>
  );
};

export default IndustryExpertise;
