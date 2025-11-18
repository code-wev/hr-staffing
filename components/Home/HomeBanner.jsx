import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

const HomeBanner = () => {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/home/HomeBanner.jpg"  
          alt="Hero Banner"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center px-6">
        <h1 className="text-white text-[64px] font-semibold leading-tight drop-shadow-lg">
          Empowering Careers.
          <br />
          Building Teams.
        </h1>

        <div className="flex justify-center">
            <p className="text-gray-200 max-w-xl  mt-4 text-[16px]">
          We connect talented professionals with organizations that value their
          skills, passion, and potential. Discover opportunities designed to help
          you grow — personally and professionally.
        </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link
            href="/find-job"
            className="bg-[#0497AE] text-white px-6 py-3 rounded-full text-sm font-medium shadow-md hover:bg-[#03899c] transition flex items-center gap-2"
          >
            Find A Job <MdArrowOutward />
          </Link>

          <Link
            href="/hire-talent"
            className="bg-white text-gray-900 px-6 py-3 rounded-full text-sm font-medium shadow-md hover:bg-gray-100 transition flex items-center gap-2"
          >
            Hire A Talent <MdArrowOutward />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
