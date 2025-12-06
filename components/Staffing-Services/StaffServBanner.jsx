import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

const StaffServBanner = () => {
  return (
    <section className="relative w-full h-[75vh] min-h-[550px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/About/AboutBanner.jpg"
          alt="Staffing Banner"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center px-6">
        {/* Heading */}
        <h1 className="text-white  text-[30px]  md:text-[42px] lg:text-[52px] font-semibold leading-tight">
          Comprehensive Staffing <br className="hidden md:flex" /> Solutions
          Tailored for You
        </h1>

        {/* Subtitle */}
        <p className="text-gray-200 text-sm md:text-[16px] max-w-2xl mx-auto mt-4 leading-relaxed">
          At VIVD, we understand that building the right team — or finding the
          right role — is more than process; it’s partnership. Whether you’re an
          organization looking to scale with confidence, or a candidate seeking
          purpose and progress, we stand with you through every step — from
          recruitment through placement and beyond.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link
            href="/careers"
            className="bg-[#0497AE] text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 shadow hover:bg-[#03899c] transition"
          >
            Find A Job <MdArrowOutward />
          </Link>

        </div>
      </div>
    </section>
  );
};

export default StaffServBanner;
